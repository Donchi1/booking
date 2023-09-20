import React from "react";
import useFetch from "../../hooks/useFetch";
import offerStyles from "@/styles/Offers.module.css";

function Offers() {
  return (
    <div className={offerStyles.offer}>
      <>
        <div className={offerStyles.offerItem}>
          <div className={offerStyles.offer_desc}>
            <h3>Escape for a while</h3>
            <p>Enjoy the freedom of a monthly stay on donnybook</p>
          </div>
          <img src="/assets/imgs/offer.jpeg" alt="" className={offerStyles.offerImg} />
          <div className={offerStyles.offerTitles}>
            <a href="/offers">Discover Monthly Stay</a>
          </div>
        </div>

        <div className={offerStyles.offerItem}>
          <div className={offerStyles.offer_desc}>
            <h3>New year, new adventures</h3>
            <p>Save 15% or more when you book and stay before March 31, 2023</p>
          </div>
          <img src="/assets/imgs/offer1.jpeg" alt="" className={offerStyles.offerImg} />
          <div className={offerStyles.offerTitles}>
            <a href="/offers">Find offer {new Date().getFullYear()}</a>
          </div>
        </div>
      </>
    </div>
  );
}

export default Offers;
