const ContactMap = () => {
  return (
    <div className=" my-8">
      <div className="w-full h-[400px] rounded-lg overflow-hidden shadow">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58366.994751126274!2d90.350825!3d23.780573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7c2b4d89d23%3A0x9cecf7e299521d60!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1706342792523!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactMap;
