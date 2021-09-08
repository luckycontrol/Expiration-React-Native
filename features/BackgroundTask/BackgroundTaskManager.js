import * as BackgroundFetch from "expo-background-fetch"

export const BACKGROUND_FETCH_TASK = "background-fetch"

export async function registerBackgroundFetchAsync(time) {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 60 * 15,
        stopOnTerminate: false, // android only
        startOnBoot: true // android only
    })
}