const FAQSection = () => {
    return (
        <div className="my-12 px-4">
            <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
            <div className="join join-vertical w-full">
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" defaultChecked />
                    <div className="collapse-title text-xl font-medium">
                        How do I participate in a contest?
                    </div>
                    <div className="collapse-content">
                        <p>Simply find a contest you like, click on Details, and register by paying the entry fee.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-xl font-medium">
                        How are winners selected?
                    </div>
                    <div className="collapse-content">
                        <p>The Contest Creator reviews all submissions and declares the winner.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-xl font-medium">
                        Can I create my own contest?
                    </div>
                    <div className="collapse-content">
                        <p>Yes! If you are a Contest Creator, you can submit contests for Admin approval.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQSection;
