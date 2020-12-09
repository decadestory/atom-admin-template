

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
                compath: `@/components/` + element.CPath + `.vue`,
                component: r => require([`@/components/` + element.CPath + `.vue`], r),
                icon: element.Icon,
                children: this.getSubMenus(element.Code),
                show: true,
                defaultUrl:element.DefaultUrl
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
                    compath: `@/components/` + element.CPath + `.vue`,
                    component: r => require([`@/components/` + element.CPath + `.vue`], r),
                    icon: element.Icon,
                    children: this.getSubMenus(element.Code),
                    show: true
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