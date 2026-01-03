import { MdQuestionAnswer, MdHelpOutline, MdSecurity, MdPayment, MdStars } from "react-icons/md";

const FAQ = () => {
  const faqData = [
    {
      id: 1,
      icon: <MdStars className="text-primary" />,
      question: "How do I start tracking a new habit?",
      answer: "Navigate to the 'Add Habit' page from the navbar. Give your habit a name, choose an icon, set your frequency (daily/weekly), and click 'Save'. Your new habit will immediately appear in your dashboard."
    },
    {
      id: 2,
      icon: <MdSecurity className="text-secondary" />,
      question: "Is my habit data private?",
      answer: "Yes. By default, all habits you create are private and visible only to you. If you choose to share a habit with the community, you can toggle the 'Public' setting when creating or editing a habit."
    },
    {
      id: 3,
      icon: <MdHelpOutline className="text-accent" />,
      question: "What are 'Public Habits'?",
      answer: "Public habits are habit templates shared by the community. You can 'Explore' these habits to find inspiration and add them to your own personal tracking list with a single click."
    },
    {
      id: 4,
      icon: <MdPayment className="text-success" />,
      question: "Does Habitly offer a premium version?",
      answer: "Currently, all features of Habitly are free to use. We believe habit tracking should be accessible to everyone who wants to improve their life."
    }
  ];

  return (
    <div className="min-h-screen bg-base-200/50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4">
            <MdQuestionAnswer className="text-4xl text-primary" />
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Frequently Asked Questions</h1>
          <p className="text-base-content/60 font-medium">
            Everything you need to know about building better routines with Habitly.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqData.map((item) => (
            <div 
              key={item.id} 
              className="collapse collapse-plus bg-base-100 border border-base-content/5 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <input type="radio" name="my-accordion-3" defaultChecked={item.id === 1} /> 
              
              <div className="collapse-title text-lg font-bold flex items-center gap-4">
                <span className="text-2xl">{item.icon}</span>
                {item.question}
              </div>

              <div className="collapse-content"> 
                <div className="divider opacity-5 mt-0 mb-3"></div>
                <p className="text-base-content/70 leading-relaxed pl-10">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-16 p-8 bg-primary rounded-3xl text-primary-content text-center shadow-xl shadow-primary/20">
          <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
          <p className="opacity-90 mb-6">Can’t find the answer you’re looking for? Please chat with our friendly team.</p>
          <button className="btn btn-secondary border-none px-8 rounded-xl font-bold">
            Contact Support
          </button>
        </div>

      </div>
    </div>
  );
};

export default FAQ;