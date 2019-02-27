declare namespace services {
    export const enum FieldTypes {
        TEXT = "TEXT",
        DATE = "DATE",
        NUMBER = "NUMBER",
        TRANSACTION = "TRANSACTION",
        EVENT_TYPE = "EVENT_TYPE",
        CURRENCY_TYPE = "CURRENCY_TYPE",
        ID = "ID",
    }

    export type Field = {
        value: any;
        type: FieldTypes;
        name: string;
        title?: string;
    };

    export const enum Sort {
        dateASC = 1,
        dateDESC = 2,
        eventType = 3,
    }

    export type EventWithFields <T> = {
        fields: {[K in keyof T]:Field}
    };

    export type EventScope = services.EventWithFields<events.News | events.Transaction>;
}