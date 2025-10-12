"use client";

import { useEffect, useState } from "react";
import { FaServer, FaCode, FaShieldAlt, FaUsers } from "react-icons/fa";
import Footer from "../_components/Footer";
import ContactForm from "../_components/ContactForm";

export default function Home() {
  useEffect(() => {
    const canvas = document.getElementById("hero-canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let particles: Particle[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 70; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    const connect = () => {
      let opacityValue = 1;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
            + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            opacityValue = 1 - (distance / 20000);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }


    window.addEventListener("resize", () => {
      resizeCanvas();
      init();
    });

    resizeCanvas();
    init();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        id="hero-canvas"
        className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-blue-900 to-indigo-900"
      ></canvas>
      <main className="relative text-white container mx-auto max-w-7xl w-full px-4 sm:px-6 md:px-8">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-widest animate-fade-in-down">
            Mail Service
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-blue-200 max-w-3xl animate-fade-in-up">
            The most developer-friendly email API for building, testing, and sending emails at scale.
          </p>
          <button className="mt-12 px-8 py-4 bg-white text-blue-900 font-bold rounded-full text-lg hover:bg-blue-100 transform hover:scale-110 transition-all duration-300 animate-fade-in-up">
            Start Sending for Free
          </button>
        </section>

        {/* About Us Section */}
        <section id="about-us" className="py-20 my-16">
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-bold uppercase tracking-wider mb-4">About Us</h2>
            <p className="text-lg text-blue-200 max-w-4xl mx-auto">
              We are a team of passionate developers who were tired of the complexities involved in email delivery. We believe that sending emails should be simple, reliable, and accessible to everyone. That's why we created Mail Service, an API-first platform designed to take the hassle out of email so you can focus on what matters most: building amazing applications.
            </p>
          </div>
        </section>

        {/* Why Us Section */}
        <section id="why-us" className="py-20 my-16">
          <h2 className="text-4xl lg:text-5xl text-center font-bold uppercase mb-16 tracking-wider">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <FeatureCard
              icon={<FaServer size={40} />}
              title="Reliable Infrastructure"
              description="Our robust infrastructure ensures high deliverability rates and minimal latency, so your emails always reach their destination."
            />
            <FeatureCard
              icon={<FaCode size={40} />}
              title="Developer-First"
              description="With clean documentation and easy-to-use SDKs, integrating our email API into your application is a breeze."
            />
            <FeatureCard
              icon={<FaShieldAlt size={40} />}
              title="Secure & Compliant"
              description="We prioritize the security of your data, adhering to industry best practices and ensuring compliance with privacy regulations."
            />
            <FeatureCard
              icon={<FaUsers size={40} />}
              title="Dedicated Support"
              description="Our expert support team is always available to help you with any questions or issues you may encounter."
            />
          </div>
        </section>


        {/* How It Works Section */}
        <section className="py-20 my-16">
          <h2 className="text-4xl lg:text-5xl text-center font-bold uppercase mb-12 tracking-wider">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-12">
            <Card text="Sign Up & Get Your API Key 🔑" />
            <Card text="Integrate with a Few Lines of Code 💻" />
            <Card text="Send Emails Through Our Endpoint 🚀" />
            <Card text="Reliable Delivery to Your Users! 💌" />
          </div>
        </section>

        {/* Contact Us Section */}
        <section id="contact-us" className="py-20 my-16">
          <h2 className="text-4xl lg:text-5xl text-center font-bold uppercase mb-12 tracking-wider">Contact Us</h2>
          <ContactForm/>
        </section>

      </main>
      <Footer />
    </>
  );
}

function Card({ text }: { text: string }) {
  return (
    <div className="p-8 bg-white/10 rounded-2xl backdrop-blur-md h-full flex justify-center items-center text-center transform hover:scale-105 transition-transform duration-300">
      <h3 className="font-bold text-xl lg:text-2xl">{text}</h3>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 bg-white/5 rounded-2xl backdrop-blur-md flex flex-col items-center text-center">
      <div className="mb-4 text-blue-300">{icon}</div>
      <h3 className="font-bold text-2xl mb-2">{title}</h3>
      <p className="text-blue-200">{description}</p>
    </div>
  );
}