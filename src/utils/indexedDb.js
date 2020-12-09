import Dexie from 'dexie';

export default {
    init() {
        var db = new Dexie('TaskDb');
        db.version(1).stores({
            task: 'key, json'
        });
        return db;
    },
    put(key, value) {
        var db = this.init();
        db.task.put({ key: key, json: value });
    },
    async get(key) {
        var db = this.init();
        var item = await db.task.get(key);
        // console.info('in:',item);
        return item;
    },
    
    remove(key) {
        var db = this.init();
        db.delete(key);
    },
};