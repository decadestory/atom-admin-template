

export default {
    getUserInfo() {
        var lsUser = this.getStore('cur-user-info');
        var loginInfo = JSON.parse(lsUser);
        return loginInfo;
    },
    isSupAdmin() {
        var lsUser = this.getStore('cur-user-info');
        var loginInfo = JSON.parse(lsUser);
        return loginInfo.RoleCode==='super_admin';
    },

    getPagePermission(pageCode){
        var lsUser =  this.getStore('cur-user-info');
        if (lsUser == null) return [];
        var loginInfo = JSON.parse(lsUser);
        if(loginInfo.Permissions == null || loginInfo.Permissions.length==0) return [];
        var pagePermission = loginInfo.Permissions.filter(p=>p.ParentCode==pageCode && p.Ptype==30);
        return pagePermission;
    },

    getPermission(){
        var lsUser = this.getStore('cur-user-info');
        if (lsUser == null) return [];
        var loginInfo = JSON.parse(lsUser);
        return loginInfo.Permissions != null ?loginInfo.Permissions:[];
    },
    getMenus() {
        var menu = [];
        var lsUser =  this.getStore('cur-user-info');
        if (lsUser == null) return menu;
        var loginInfo = JSON.parse(lsUser);
        if (loginInfo.Permissions == null || loginInfo.Permissions == []) return menu;

        loginInfo.Permissions.forEach(element => {
            if (element.ParentCode != null) return;
            menu.push({
                ptype: element.Ptype,
                path: element.VUrl,
                name: element.Name,
                code: element.Code,
                compath: element.CPath + `.vue`,
                component: () => import("../"+element.CPath+ `.vue`),
                icon: element.Icon,
                children: this.getSubMenus(element.Code),
                show: true,
                defaultUrl:element.DefaultUrl,
                meta: {code: element.Code}
            });
        });

        return menu;
    },
    getSubMenus(code) {
        var menu = [];
        var lsUser =  this.getStore('cur-user-info');
        if (lsUser == null) return menu;
        var loginInfo = JSON.parse(lsUser);
        if (loginInfo.Permissions == null || loginInfo.Permissions == []) return menu;

        loginInfo.Permissions.forEach(element => {
            if (element.ParentCode == code && element.VUrl != null) {
                menu.push({
                    ptype: element.Ptype,
                    path: element.VUrl,
                    name: element.Name,
                    code: element.Code,
                    compath: element.CPath + `.vue`,
                    component: () => import("../"+element.CPath+ `.vue`),
                    icon: element.Icon,
                    children: this.getSubMenus(element.Code),
                    show: true,
                    meta: {code: element.Code}
                });
            }
        });

        return menu;
    },
    getOpeneds(code) {
        var openeds = [];
        var lsUser = this.getStore('cur-user-info');
        if (lsUser == null) return openeds;
        var loginInfo = JSON.parse(lsUser);
        if (loginInfo.Permissions == null || loginInfo.Permissions == []) return openeds;

        loginInfo.Permissions.forEach(element => {
            if (element.ParentCode == code && element.VUrl != null) openeds.push(element.VUrl);
        });

        return openeds;
    },
    getCurMenusInfo(code) {

        if(code=="main") return null;

        var lsUser = this.getStore('cur-user-info');
        if (lsUser == null) return openeds;
        var loginInfo = JSON.parse(lsUser);
        if (loginInfo.Permissions == null || loginInfo.Permissions == []) return {};

        var curThird = {};
        loginInfo.Permissions.forEach(element => {
            if (element.Code == code) curThird = element;
        });

        if(!curThird) return null;

        var curSub = {};
        loginInfo.Permissions.forEach(element => {
            if (element.Code == curThird.ParentCode) curSub=element;
        });
        if(!curSub) return null;

        var curFirst = {};
        loginInfo.Permissions.forEach(element => {
            if (element.Code == curSub.ParentCode) curFirst=element;
        });
        if(!curFirst) return null;

        var subs = [];
        loginInfo.Permissions.forEach(element => {
            if (element.ParentCode == curFirst.Code) 
            subs.push({path:element.VUrl,name:element.Name,isCur:element.Code ==curSub.Code});
        });

        var thirds = [];
        loginInfo.Permissions.forEach(element => {
            if (element.ParentCode == curSub.Code) 
            thirds.push({path:element.VUrl,name:element.Name,isCur:element.Code ==code});
        });


        return {subs,thirds};
    },
    getCurMenu(){
        var menu = [];
        var menuJson =  this.getStore('cur-user-menu');
        if (menuJson == null) return menu;
        var menu = JSON.parse(menuJson);
        return menu;
    },
    setStore(key, value) {
        window.localStorage.setItem(key, value);
    },
    getStore(key) {
        return window.localStorage.getItem(key);
    },
    removeStore(key) {
        if(key.indexOf('task-')>=0)  return this.removeSessionStore(key);
        if(key.indexOf('jwt-token')>=0) return this.removeSessionStore(key);
        // if(key.indexOf('cur-user-info')>=0) return this.removeSessionStore(key);
        // if(key.indexOf('cur-user-menu')>=0) return this.removeSessionStore(key);
        window.localStorage.removeItem(key);
    },
    getToken(){
        var token =  this.getStore('jwt-token');
        return token;
    },
    setSessionStore(key, value) {
        window.sessionStorage .setItem(key, value);
    },
    getSessionStore(key) {
        return window.sessionStorage.getItem(key);
    },
    removeSessionStore(key) {
        window.sessionStorage.removeItem(key);
    },

}