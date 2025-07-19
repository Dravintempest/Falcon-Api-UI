const axios = require('axios');

class Nakanime {
    constructor() {
        this.client = axios.create({
            baseURL: 'https://anime.nakanime.my.id/api/anime',
            headers: {
                accept: 'application/json, text/plain, */*',
                'accept-encoding': 'gzip',
                'user-agent': 'okhttp/4.9.2'
            }
        });
    }
    
    get = async function (order = 'latest', page = 1) {
        try {
            const _order = ['title', 'latest', 'popular', 'rating', 'update', 'titlereverse'];
            if (!_order.includes(order)) throw new Error(`Available orders: ${_order.join(', ')}`);
            
            const { data } = await this.client('/all/', {
                params: {
                    order,
                    page
                }
            });
            
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    genre = async function (genre = 'action', page = 1) {
        try {
            const { data: g } = await this.client('/genre');
            const _genre = g.data.map(c => c.slug);
            if (!_genre.includes(genre)) throw new Error(`Available genres: ${_genre.join(', ')}`);
            
            const { data } = await this.client('/bygenres/', {
                params: {
                    genre,
                    page
                }
            });
            
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    search = async function (query) {
        try {
            if (!query) throw new Error('Query is required');
            
            const { data } = await this.client('/search/', {
                params: {
                    keyword: query
                }
            });
            
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    getDetail = async function (url) {
        try {
            const match = url.match(/^https:\/\/api\.nakanime\.my\.id\/anime\/([^\/]+)\/?$/);
            if (!match) throw new Error('Invalid url');
            
            const { data } = await this.client({
                params: {
                    name: match[1]
                }
            });
            
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    getData = async function (url) {
        try {
            const match = url.match(/^https:\/\/api\.nakanime\.my\.id\/([^\/]+episode-[^\/]+)\/?$/);
            if (!match) throw new Error('Invalid url');
            
            const { data } = await this.client('/data/', {
                params: {
                    slug: match[1]
                }
            });
            
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

// Usage:
const n = new Nakanime();
const resp = await n.search('konosuba');
console.log(resp);
