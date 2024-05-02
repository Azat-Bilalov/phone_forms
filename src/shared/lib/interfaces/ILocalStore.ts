export interface ILocalStore {
    /**
     * Здесь выполняются отписки от событий, очистка таймеров и т.д.
     */
    destroy: VoidFunction;
}
