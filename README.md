##Как запустить:
1. #### `yarn`
2. #### `yarn start`
    Приложение запустится на `http://localhost:3000`

##Как добавить событие "Запрос перевода":

1. В `events.d.ts`:
 
    Добавить новый тип события в `eventType`
    
    Добавить новый интерфейс, в котором обязательно должны быть поля:
    
    `date: string;`
    
    `eventType: events.eventType;`
    
    `id: number;`
    
2. В `services.d.ts` в тип `EventScope` добавить новый интерфейс.
3. В `constants.ts` создать новую константу с типом `services.EventScope`, по примеру с остальными, 
указав нужный тип `type: services.FieldTypes` и значение `value: any` для каждого поля.
4. В `EventEditor.tsx`:

    В метод `renderEventsDropdown` добавить новый `MenuItem` c пропсом
    
    onClick={() => this.editorSelector(**новый тип из events.eventType**)} и названием события.
    
    В метод `eventCaption` добавить `case` c новым типом, который будет возвращать необходимое название события.