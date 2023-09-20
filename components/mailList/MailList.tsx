import mailistStyles from "@/styles/MailList.module.css"

const MailList = () => {
  return (
    <div className={mailistStyles.mail}>
      <h1 className={mailistStyles.mailTitle}>Save time, save money!</h1>
      <span className={mailistStyles.mailDesc}>Sign up and we will send the best deals to you</span>
      <div className={mailistStyles.mailInputContainer}>
        <input type="text" placeholder="Your Email" />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default MailList