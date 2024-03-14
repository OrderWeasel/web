"use client";
import BULLET_POINT from "../../lib/utils/bulletPoint";

export default function Merchant(){
  return (
    <main>
      <article className="welcome">
        <h2>Welcome Merchants</h2>

        <section>
          <h3>What is order Weasel?</h3>
          <p>
            {BULLET_POINT} You can think of our service as an online alternative to
            calling in an order so customers can order carryout in a convenient way
            at no extra cost to you or the customer.
          </p>
          <p>
          {BULLET_POINT} That's it. It's just another way to connect you to the
          customer.
        </p>
        </section>

        <section>
          <h3>What does it cost?</h3>
          <p>{BULLET_POINT} OrderWeasel is a free service</p>
          <p>
            {BULLET_POINT} Other online-ordering services charge a covenience fee to make up for the expense of handling online transactions. Since we don't handle payments ourselves, we have very
            little overhead, which means we don't have any costs to pass onto you or the customer
          </p>
        </section>

        <section>
          <h3>Nothing is free. What's the catch?</h3>
          <p>{BULLET_POINT} No catch. We're in it for the experience and hopefully it makes you a little extra money along the way!</p>
          <p>
            {BULLET_POINT} All we ask is you tell your friends about us!
          </p>
        </section>

        <section>
          <h3>How does it work?</h3>
          <p>
            {BULLET_POINT} OrderWeasel only integrates with
            Square POS only at this time.
          </p>
          <p>
            {BULLET_POINT} When you sign up, we'll ask you to authorize OrderWeasel to
            pull your menu directly from your Square POS Account so we add your menu to our service
          </p>
          <p>
            {BULLET_POINT} When a customer submits an order, we'll send a
            notification so whoever is on the register can view and enter the order
            in the system.
          </p>
          <p>
            {BULLET_POINT} We also provide an order queue in the app so you can keep
            tabs on incoming orders. The order queue is used to acknowledge orders
            and mark them as complete so the customer can have a better idea of when
            to arrive.
          </p>
        </section>
      </article>
    </main>
  );
}
