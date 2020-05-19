<template>
  <div class="footer">
    <Row>
      <i-col :xs="{span: 22, push: 1}" :sm="{span: 12, push: 6}">
        <div class="footer-l">
          <p id="i-work"></p>
          <p>Copyright © 2020 PGJett</p>
          <p>Powered by Vue + Node + Java</p>
        </div>
        <div class="footer-r">
          <a href="http://www.hainanu.edu.cn/" target="_blank">
            <img :src="hainanu" />
          </a>
          <p>学生毕业设计作品</p>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "Foot",
  data () {
    return {
      hainanu: require('../../assets/img/hainanu.png')
    }
  },
  mounted: function () {
    // 文字变幻特效
    !(function (r) {
      function t () {
        return b[Math.floor(Math.random() * b.length)]
      }

      function e () {
        return String.fromCharCode(94 * Math.random() + 33)
      }

      function n (r) {
        for (var n = document.createDocumentFragment(), i = 0; r > i; i++) {
          var l = document.createElement("span");
          l.textContent = e(), l.style.color = t(), n.appendChild(l)
        }
        return n
      }

      function i () {
        var t = o[c.skillI];
        c.step ? c.step-- : (c.step = g, c.prefixP < l.length ? (c.prefixP >= 0 && (c.text += l[c.prefixP]), c.prefixP++) : "forward" === c.direction ? c.skillP < t.length ? (c.text += t[c.skillP], c.skillP++) : c.delay ? c.delay-- : (c.direction = "backward", c.delay = a) : c.skillP > 0 ? (c.text = c.text.slice(0, -1), c.skillP--) : (c.skillI = (c.skillI + 1) % o.length, c.direction = "forward")), r.textContent = c.text, r.appendChild(n(c.prefixP < l.length ? Math.min(s, s + c.prefixP) : Math.min(s, t.length - c.skillP))), setTimeout(i, d)
      }

      var l = "I work with ",
        o = ["Java", "JavaScript", "HTML/CSS", "Node.js", "Vue.js", "passion & love"].map(function (r) {
          return r
        }), a = 2, g = 1, s = 5, d = 75,
        b = ["rgb(110,64,170)", "rgb(150,61,179)", "rgb(191,60,175)", "rgb(228,65,157)", "rgb(254,75,131)", "rgb(255,94,99)", "rgb(255,120,71)", "rgb(251,150,51)", "rgb(226,183,47)", "rgb(198,214,60)", "rgb(175,240,91)", "rgb(127,246,88)", "rgb(82,246,103)", "rgb(48,239,130)", "rgb(29,223,163)", "rgb(26,199,194)", "rgb(35,171,216)", "rgb(54,140,225)", "rgb(76,110,219)", "rgb(96,84,200)"],
        c = { text: "", prefixP: -s, skillI: 0, skillP: 0, direction: "forward", delay: a, step: g }
      i()
    })(document.getElementById('i-work'))
  }
}
</script>

<style>
.footer {
  clear: both;
  font-size: 13px;
  color: #5f5f5f;
  width: 100%;
  border-top: 1px solid #e0e0e0;
  margin-top: 20px;
  padding: 30px 0 10px;
}
.footer-l {
  float: left;
}
.footer-r {
  float: right;
  text-align: center;
}
.footer-r img {
  width: 30px;
  height: 36px;
}
</style>