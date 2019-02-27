declare namespace events {
    export const enum eventType {
        none = 0,
        transaction = 1,
        news = 2,
    }

    export interface News {
        id: number;
        title: string;
        description: string;
        date: string;
        eventType: events.eventType;
    }

    export const enum transactionType {
        none = 0,
        arrival = 1,
        expense = 2,
    }

    export const enum currencyType {
        ruble = 1,
        dollar = 2,
        euro = 3,
    }

    export interface Transaction {
        id: number;
        amount: number;
        currency: events.currencyType;
        fromWhom: string;
        description: string;
        transactionType: events.transactionType;
        date: string;
        eventType: events.eventType;
    }
}