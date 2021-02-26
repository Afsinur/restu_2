const app = {
  data() {
    return {
      live: 0,
      trigger: 0,
      data: null,
    };
  },

  methods: {
    loadAll() {
      fetch("../js/json/sections.json")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.data = data;
          this.trigger = 1;
        })
        .catch((err) => {
          alert(err);
        });
    },

    liveCheck() {
      var liveChecker = setInterval(() => {
        if (this.trigger == 1) {
          clearInterval(liveChecker);

          this.live = 1;

          setInterval(() => {
            if (document.querySelector("#mark") == null) {
              document.body.innerHTML += this.data.section.div;

              const mark = document.querySelector("#mark");
              const markH1 = document.querySelector("#mark h1");

              markH1.innerHTML = this.data.section.id;

              setInterval(() => {
                if (document.querySelector("#mark") != null) {
                  Object.assign(mark.style, this.data.section.style1);
                  Object.assign(markH1.style, this.data.section.style2);
                }
              }, 1000);
            }
          }, 5000);
        }
      }, 500);
    },
  },

  beforeMount() {
    this.loadAll();
  },

  mounted() {
    this.liveCheck();
  },
};
Vue.createApp(app).mount("#app");
