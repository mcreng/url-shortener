
const Auth = {
    isAuthenticated: false,
    token: null,
    userName: null,
    userImage: null,
    disconnect: null,
    authenticate(tf, cb) {
        this.isAuthenticated = tf;
        cb();
    },
    setToken(token) {
        this.token = token;
    },
    setUser(user) {
        this.token = user.getAuthResponse().id_token;
        this.userName = user.getBasicProfile().getName();
        this.userImage = user.getBasicProfile().getImageUrl();
        this.disconnect = user.disconnect;
    },
    setName(name) {
        this.userName = name;
    },
    setImage(img) {
        this.userImage = img;
    },
    getToken() {
        return this.token;
    },
    getName() {
        return this.userName;
    },
    getImageUrl() {
        return this.userImage;
    },
    resetUser() {
        this.setToken(null);
        this.setName(null);
        this.setImage(null);
        this.disconnect = null;
    }
    // signout(cb) {
    //   this.isAuthenticated = false;
    //   setTimeout(cb, 100);
    // }
  };


export default Auth;