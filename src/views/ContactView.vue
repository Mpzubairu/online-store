<template>
  <section id="page-header" class="about-header">
    <h2>#let's_talk</h2>
    <p>LEAVE A MESSAGE. We love to hear from you!</p>
  </section>
  <section id="contact-details" class="section-p1">
    <div class="details">
      <span>GET IN TOUCH</span>
      <h2>Visit one of our agency locations or contact us today</h2>
      <h3>Head Office</h3>
      <div>
        <li>
          <i class="fal fa-map"></i>
          <p>56 Glassford Street Glasgow G1 1UL New York</p>
        </li>
        <li>
          <i class="fal fa-envelope"></i>
          <p>contact@example.com</p>
        </li>
        <li>
          <i class="fal fa-phone-alt"></i>
          <p>contact@example.com</p>
        </li>
        <li>
          <i class="fal fa-clock"></i>
          <p>Monday to Sturday: 9.00am to 16.00pm</p>
        </li>
      </div>
    </div>
    <div class="map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2469.8338612143825!2d-1.2550437!3d51.754361499999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876c6a9ef8c485b%3A0xd2ff1883a001afed!2sUniversity%20of%20Oxford!5e0!3m2!1sen!2sin!4v1690649854338!5m2!1sen!2sin"
        width="600" height="450" style="border:0;" loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>
  </section>
  <section id="form-details">
    <form action="">
        <span>LEAVE A MESSAGE</span>
        <h2>We love to hear from you</h2>
        <input type="text" placeholder="Your Name">
        <input type="text" placeholder="E-mail">
        <input type="text" placeholder="Subject">
        <textarea name="" id="" cols="30" rows="10" placeholder="Your MESSAGE"></textarea>
        <button class="normal">Submit</button>
    </form>
    <div class="people">
      <div>
        <img src="img/people/1.png" alt="">
        <p><span>John Doe</span>Senior Marketing Manager <br> Phone: +000 123 000 77 88 <br>Email: contact@example.com</p>
      </div>
      <div>
        <img src="img/people/2.png" alt="">
        <p><span>William Smith</span>Senior Marketing Manager <br> Phone: +000 123 000 77 88 <br>Email: contact@example.com</p>
      </div>
      <div>
        <img src="img/people/3.png" alt="">
        <p><span>Emma Stone</span>Senior Marketing Manager <br> Phone: +000 123 000 77 88 <br>Email: contact@example.com</p>
      </div>
    </div>
  </section>
  <footerview/>
</template>
<script>
import footerview from '@/components/FooterView.vue'
export default {
  name: 'ContactView',
  components: {
    footerview
  }
}
</script>
