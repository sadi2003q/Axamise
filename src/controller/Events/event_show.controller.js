
// path: src/controller/event_show.controller.js

import { EventShowService } from '../../services/Events/_event_show.service.js'
import { routes } from '../../Utilities.ts'

export class EventShowController {
    constructor(events, setEvents, searchQuery, setLoading, setError, navigate) {
        this.service = new EventShowService();
        this.navigate = navigate;
        this.setEvents = setEvents;
        this.searchQuery = searchQuery;
        this.events = events;
        this.setLoading = setLoading;
        this.setError = setError;
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
            const result = await this.service.GetAllEvents(id);

            if (result.success) {
                if (result.data && result.data.length > 0) this.setEvents(result.data);
                else this.setError("No events found");
            } else {
                this.setError(result.error || "Failed to fetch events");
            }
        } catch (err) {
            this.setError(err.message || "Something went wrong");
        } finally {
            this.setLoading(false);
        }
    };
}
