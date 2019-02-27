const transactionEditor: services.EventScope = {
    fields: {
        id: {
            value: null,
            type: services.FieldTypes.ID,
            name: "ID",
        },
        amount: {
            value: "",
            type: services.FieldTypes.NUMBER,
            name: "Cумма транзакции",
        },
        currency: {
            value: events.currencyType.ruble,
            type: services.FieldTypes.CURRENCY_TYPE,
            name: "Валюта",
        },
        fromWhom: {
            value: "",
            type: services.FieldTypes.TEXT,
            name: "От кого транзакция",
        },
        description: {
            value: "",
            type: services.FieldTypes.TEXT,
            name: "Описание",
        },
        transactionType: {
            value: events.transactionType.none,
            type: services.FieldTypes.TRANSACTION,
            name: "Тип транзакции",
        },
        date: {
            value: "",
            type: services.FieldTypes.DATE,
            name: "Дата",
        },
        eventType: {
            value: events.eventType.transaction,
            type: services.FieldTypes.EVENT_TYPE,
            name: "Тип события",
            title: "Транзакция",
        }
    }
};

const newsEditor: services.EventScope = {
    fields: {
        id: {
            value: null,
            type: services.FieldTypes.ID,
            name: "ID",
        },
        title: {
            value: "",
            type: services.FieldTypes.TEXT,
            name: "Название",
        },
        description: {
            value: "",
            type: services.FieldTypes.TEXT,
            name: "Описание",
        },
        date: {
            value: "",
            type: services.FieldTypes.DATE,
            name: "Дата",
        },
        eventType: {
            value: events.eventType.news,
            type: services.FieldTypes.EVENT_TYPE,
            name: "Тип события",
            title: "Новость",
        }
    }
};

export {newsEditor, transactionEditor};