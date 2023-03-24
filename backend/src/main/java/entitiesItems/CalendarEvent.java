package entitiesItems;

import entities.Calendar;

import javax.persistence.*;

public class CalendarEvent {

    @Column
    private Calendar dueDate;

    @Column
    private Calendar settingDate; // the date it was added to the calendar

    @Column
    private String type; // it can be a hwk, a test or an assignment

    public CalendarEvent(Long id, Calendar dueDate, Calendar settingDate, String type) {
        this.dueDate = dueDate;
        this.settingDate = settingDate;
        this.type = type;
    }

    public CalendarEvent() {

    }

    public Calendar getDueDate() {
        return dueDate;
    }

    public Calendar getSettingDate() {
        return settingDate;
    }

    public String getType() {
        return type;
    }
}
