
const Auth = {
    isAuthenticated: false,
    userName: null,
    userImage: null,
    authenticate(tf, cb) {
        this.isAuthenticated = tf;
        cb();
    },
    setUser(user) {
        this.userName = user.getName();
        this.userImage = user.getImageUrl();
    },
    setName(name) {
        this.userName = name;
    },
    setImage(img) {
        this.userImage = img;
    },
    getName() {
        return this.userName;
    },
    getImageUrl() {
        return this.userImage;
    },
    resetUser() {
        this.setName(null);
        this.setImage(null);
    }
    // signout(cb) {
    //   this.isAuthenticated = false;
    //   setTimeout(cb, 100);
    // }
  };


export default Auth;