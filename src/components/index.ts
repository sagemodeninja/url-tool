import { SearchParam } from "./search-param";

export { SearchParam };

declare global {
    interface HTMLElementTagNameMap {
        'search-param': SearchParam;
    }
}