import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const About = () => {
    return (
        <div className="min-h-screen bg-base-100 py-12 px-4 md:px-8">
            <div className="max-w-4xl mx-auto space-y-16">

                {/* About Section */}
                <section className="text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        About ContestHub
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        ContestHub is a premier platform designed to bridge the gap between creative talent and opportunity.
                        We empower creators to showcase their skills through exciting contests while helping businesses
                        find the perfect solutions for their needs. Whether you're a designer, writer, or innovator,
                        ContestHub is your stage to shine.
                    </p>
                </section>

                {/* Mission & Vision Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-purple-50 dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Our Mission</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            To create a fair, transparent, and dynamic environment where creativity is rewarded and
                            innovation thrives without boundaries.
                        </p>
                    </div>
                    <div className="bg-pink-50 dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Our Vision</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            To become the world's leading community for crowdsourced creativity, connecting millions
                            of talents with endless possibilities.
                        </p>
                    </div>
                </div>

                {/* Contact Section */}
                <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl p-8 md:p-12 shadow-lg">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Get in Touch</h2>
                        <p className="text-gray-500 dark:text-gray-400">Have questions? We'd love to hear from you.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="flex flex-col items-center space-y-3">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <FaEnvelope className="text-xl" />
                            </div>
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Email Us</h4>
                            <p className="text-gray-500 text-sm">support@contesthub.com</p>
                        </div>

                        <div className="flex flex-col items-center space-y-3">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                                <FaPhone className="text-xl" />
                            </div>
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Call Us</h4>
                            <p className="text-gray-500 text-sm">+1 (555) 123-4567</p>
                        </div>

                        <div className="flex flex-col items-center space-y-3">
                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-400">
                                <FaMapMarkerAlt className="text-xl" />
                            </div>
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200">Visit Us</h4>
                            <p className="text-gray-500 text-sm">123 Creative Street, NY</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
