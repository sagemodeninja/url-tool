import './index.css';
import './components';
import { InternalSearchParams } from './InternalSearchParams';

class URLTool {
    urlInput: HTMLInputElement;
    originInput: HTMLInputElement;
    pathInput: HTMLInputElement;
    searchParamsCont: HTMLDivElement;
    debounce: number;

    url: URL;
    searchParams: InternalSearchParams;

    constructor() {
        this.urlInput = document.querySelector('#url');
        this.originInput = document.querySelector('#origin');
        this.pathInput = document.querySelector('#path');
        this.searchParamsCont = document.querySelector('#search_params_container');
    
        this.urlInput.addEventListener('input', this.handleInput);
    }
    
    handleInput = () => {
        if (this.debounce)
            window.clearTimeout(this.debounce);
    
        this.debounce = window.setTimeout(this.parseURL, 150);
    }
    
    parseURL = () => {
        try {
            const url = new URL(this.urlInput.value);

            console.log(url);

            this.url = url;
            this.searchParams = new InternalSearchParams(url.search);
            this.originInput.value = url.origin;
            this.pathInput.value = url.pathname;
        
            this.handleSearchParams();
        } catch (e) {
            if (e instanceof TypeError)
                console.error("Wrong URL format!");
            else
                throw e;
        }
    }
    
    handleSearchParams = () => {
        this.searchParamsCont.innerHTML = null;

        for(const [key, value] of this.searchParams) {
            const searchParam = document.createElement('search-param');
    
            searchParam.setAttribute('key', key);
            searchParam.setAttribute('value', value);
    
            let previousKey = key;
    
            searchParam.addEventListener('input', () => {
                if (previousKey !== searchParam.key) {
                    this.searchParams.replaceKey(previousKey, searchParam.key);
                    previousKey = searchParam.key;
                } else {
                    this.searchParams.set(searchParam.key, searchParam.value);
                }
                
                this.reconstructURL();
            });
    
            this.searchParamsCont.appendChild(searchParam);
        }
    }

    reconstructURL() {
        const url = this.url;
        const searchParams = this.searchParams.toString();

        this.urlInput.value = `${url.origin}${url.pathname}?${searchParams}${url.hash}`;
    }
}
    
document.addEventListener('DOMContentLoaded', () => {
    // Initialize tool
    new URLTool();
});