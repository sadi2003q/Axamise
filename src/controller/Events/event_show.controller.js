
// path: src/controller/event_show.controller.js

import { EventShowService } from '../../services/Events/_event_show.service.ts'
import { routes } from '../../Utilities.ts'
import { EventService } from "../../services/Events/_repositories/_factory.event.service.js";
import { SERVICE } from '../../Utilities.js'
import { LocalCache } from '../../localCache.js'


export class EventShowController {
    constructor(events, setEvents, searchQuery, setLoading, setError, navigate) {
        // this.service = new EventShowService();
        this.service = EventService.createService(SERVICE.EVENT_SHOW)


        this.navigate = navigate;
        this.setEvents = setEvents;
        this.searchQuery = searchQuery;
        this.events = events;
        this.setLoading = setLoading;
        this.setError = setError;

        // Initialising Local Cache
        this.cache = new LocalCache('EventCache');
    }


    handleNavigation_EventEnter = (item) => {
        this.navigate(routes.event_enter, { state: {item: item} });
    }

    handleAddQuestion = (item) => {
        this.navigate(routes.question_create, { state: { itemID: item.id } });
    };

    handleEdit = (item) => {
        this.navigate(routes.event_create, { state: { itemID: item.id } });
    };

    handleDelete = async (item) => {
        try {
            const result = await this.service.Delete_Event(item.id);
            if (result.success) {
                this.setEvents((prev) => prev.filter((e) => e.id !== item.id));
            } else {
                console.error("Delete failed:", result.error);
            }
        } catch (error) {
            console.log(`Failed to Delete: ${error}`);
        }
    };

    handleAllQuestions = () => {
        this.navigate(routes.question_list);
    };

    fetchEvents = async (id) => {
        try {
            const cached = this.cache.load();

            // STEP 1: If cache exists → show cached data instantly
            if (cached) this.setEvents(cached);

            // STEP 2: Fetch from server
            const result = await this.service.GetAllEvents(id);

            if (!result.success) {
                this.setError(result.error || "Failed to fetch events");
                return;
            }

            const fresh = result.data || [];

            // STEP 3: If cache AND fresh data are same → no UI update needed
            if (this.cache.isSame(fresh)) {
                console.log("Cache is already up-to-date");
                return;
            }

            // STEP 4: Cache is different → update cache & UI
            this.cache.save(fresh);
            this.setEvents(fresh);

        } catch (err) {
            this.setError(err.message || "Something went wrong");
        } finally {
            this.setLoading(false);
        }
    };

}
