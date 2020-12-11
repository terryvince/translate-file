export default {
  data() {
    return {
      disabled: false,
      text: "အတည်ပြုကုဒ်ရ"
    };
  },
  methods: {
    sendCode() {
      if (this.disabled) return;
      this.disabled = true;
      let n = 60;
      this.text = "ကျန် " + n + "s";
      const run = setInterval(() => {
        n = n - 1;
        if (n < 0) {
          clearInterval(run);
        }
        this.text = "ကျန် " + n + "s";
        if (this.text < "ကျန် " + 0 + "s") {
          this.disabled = false;
          this.text = "ပြန်လည်ရယူရန်";
        }
      }, 1000);
    }
  }
};
