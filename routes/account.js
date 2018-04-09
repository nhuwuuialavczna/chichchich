/**
 * Created by JINX_NHI on 4/9/2018.
 */
module.exports = {
    foo: function () {
        // whatever
    },
    account: function (email, password, name, ip, hinhanh, banbe, baiviet, filedaup, danhgia) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.ip = ip;
        this.hinhanh = hinhanh;
        this.banbe = banbe;
        this.baiviet = baiviet;
        this.filedaup = filedaup;
        this.danhgia = danhgia;

        this.equals = function (that) {
            return this.email === that.email && this.password === that.password && this.password !== 'no';
        }
    },

    checkaccout: function (list,account) {
        for(var i=0;i<list.length;i++){
            var accc = list[i];
            if(this.equals(accc)){
                return i;
            }
        }
        return -1;
    }
};
