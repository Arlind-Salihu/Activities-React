import { format } from "date-fns";
import { makeAutoObservable, reaction, runInAction } from "mobx"
import agent from "../api/agent";
import { Activity, ActivityFormValues } from "../models/activity";
import { Profile } from "../models/profile";
import { store } from "./store";
import { Pagination, PagingParams } from "../models/pagination";

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    predicate = new Map().set('all', true);

    constructor() {
        makeAutoObservable(this)

        reaction(() => this.predicate.keys(),
        () => {
            this.pagingParams = new PagingParams();
            this.activityRegistry.clear();
            this.loadActivities();
        }
    )
    }

    setPagingParams = (pagingParams: PagingParams) =>{
        this.pagingParams = pagingParams;
    }

    setPredicate = (predicate: string, value: string | Date) =>{
        const resetPredicate = () =>{
            this.predicate.forEach((value, key) => {
                if(key !== 'startDate') this.predicate.delete(key);
            })
        }
        switch (predicate) {
            case 'all':
                resetPredicate();
                this.predicate.set('all', true);
                break;
            case 'isInteresed':
                resetPredicate();
                this.predicate.set('isInteresed', true);
                break;
            case 'isHost':
                resetPredicate();
                this.predicate.set('isHost', true);
                break;
            case 'startDate':
                this.predicate.delete('startDate');
                this.predicate.set('startDate', value);
        }
    }

    get axiosParams(){
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        this.predicate.forEach((value, key) => {
            if(key === 'startDate'){
                params.append(key, (value as Date).toISOString())
            } else {
                params.append(key, value);
            }
        })
        return params;
    }

    get activitiesByDate() {
        return Array.from(this.activityRegistry.values()).sort((a, b) => a.data!.getTime() - b.data!.getTime());
    }

    get groupedActivities(){
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) =>{
                const data = format(activity.data!, 'dd MMM yyy');
                activities[data] = activities[data] ? [...activities[data], activity] : [activity]
                return activities;
            }, {} as {[key: string]: Activity[]})
        )
    }

    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Activities.list(this.axiosParams);
            result.data.forEach((activity) => {
                this.setActivity(activity);
            })
            this.setPagination(result.pagination);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false);
        }
    }

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                })
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setActivity = (activity: Activity) => {
        const user = store.userStore.user;
        if (user){
            activity.isInteresed = activity.activitiesPrezencat!.some(
                a => a.username === user.username
            )
            activity.isHost = activity.hostUsername === user.username;
            activity.host = activity.activitiesPrezencat?.find(x => x.username === activity.hostUsername)
        }
        activity.data = new Date(activity.data!);
        this.activityRegistry.set(activity.id, activity);
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createActivity = async (activity: ActivityFormValues) => {
        const user = store.userStore.user;
        const activityPrezent = new Profile(user!);
        try {
            await agent.Activities.create(activity);
            const newActivity = new Activity(activity);
            newActivity.hostUsername = user!.username;
            newActivity.activitiesPrezencat = [activityPrezent];
            this.setActivity(newActivity);
            runInAction(() => {
                this.selectedActivity = newActivity;
            })
        } catch (error) {
            console.log(error);
        }
    }

    updateActivity = async (activity: ActivityFormValues) => {
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                if(activity.id){
                    let updatedActivity = {...this.getActivity(activity.id), ...activity}
                    this.activityRegistry.set(activity.id, updatedActivity as Activity);
                    this.selectedActivity = updatedActivity as Activity;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updatePrezencen = async () => {
        const user = store.userStore.user;
        this.loading = true;
        try {
            await agent.Activities.activityPrezent(this.selectedActivity!.id);
            runInAction(() => {
                if(this.selectedActivity?.isInteresed){
                    this.selectedActivity.activitiesPrezencat = this.selectedActivity.activitiesPrezencat?.filter(a => a.username !== user?.username);
                    this.selectedActivity.isInteresed = false;
                } else {
                    const activityPrezent = new Profile(user!);
                    this.selectedActivity?.activitiesPrezencat?.push(activityPrezent);
                    this.selectedActivity!.isInteresed = true;
                }
                this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!)
            })
        } catch (error) {
            console.log(error)            
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    cancelActivityToggle = async () => {
        this.loading = true;
        try {
            await agent.Activities.activityPrezent(this.selectedActivity!.id);
            runInAction(() => {
                this.selectedActivity!.isCancelled = !this.selectedActivity?.isCancelled;
                this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!)
            })
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    clearSelectedActivity = () => {
        this.selectedActivity = undefined;
    }

    updatePrezencaFollowing = (username: string) => {
        this.activityRegistry.forEach(activity => {
            activity.activitiesPrezencat.forEach(activityPrezenca =>{
                if(activityPrezenca.username === username){
                    activityPrezenca.following ? activityPrezenca.followersCount-- : activityPrezenca.followersCount++;
                    activityPrezenca.following = !activityPrezenca.following;
                }
            })
        })
    }
}