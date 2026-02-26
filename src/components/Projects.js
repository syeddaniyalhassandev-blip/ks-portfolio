"use client";

import Section from "./Section";
import Image from "next/image";
import { motion } from "framer-motion";

const projectsData = [
  {
    name: "Remote Controlled Car",
    desc: "Built an Arduino Nano-based 4WD RC car using TT motors, L298N motor driver, and Bluetooth module. Implemented forward, reverse, and differential steering, controlled via a custom mobile application.",
    tags: ["Arduino Nano", "L298N", "Bluetooth", "TT Motor", "Embedded C++"],
    icon: "/projects/rc_car_icon.png",
  },
  {
    name: "Light Weight RoboWar",
    desc: "Designed and fabricated a lightweight RoboWar combat robot. Integrated a brushless motor with ESC for the weapon system and brushed ESC for drive motors, controlled using RF transmitter and receiver.",
    tags: ["Brushless Motor", "ESC", "RF Transmitter", "Fabrication", "Mechanical Design"],
    icon: "/projects/robowar_icon.png",
  },
  {
    name: "Motor & Motion Automation",
    desc: "Developed a PLC-based motor control system using Siemens S7-1200 with SCADA interface for real-time monitoring and speed control.",
    tags: ["Siemens PLC", "TIA Portal", "SCADA", "Automation"],
    icon: "/projects/motor_auto_icon.png",
  },
  {
    name: "Soccer Robot",
    desc: "Developed an ESP32-based soccer robot using built-in Wi-Fi for mobile control. Used metal gear motors with L298N motor driver for precise and responsive multi-directional movement.",
    tags: ["ESP32", "Wi-Fi", "L298N", "Metal Gear Motor", "Mobile Control"],
    icon: "/projects/soccer_robot_icon.png",
  },
  {
    name: "Home Automation",
    desc: "Implemented IoT-based home automation using ESP32 with relay modules. Controlled appliances via mobile app over Wi-Fi.",
    tags: ["ESP32", "IoT", "Wi-Fi", "Relay"],
    icon: "/projects/home_auto_icon.png",
  },
  {
    name: "Fire & Safety System",
    desc: "Built an automated fire detection and suppression system using flame sensors, MQ-2 gas sensor, and servo-controlled water pump.",
    tags: ["Arduino", "Flame Sensor", "MQ-2", "Servo"],
    icon: "/projects/fire_safety_icon.png",
  },
  {
    name: "Line Following Robot",
    desc: "Designed and fabricated a high-speed LFR using a custom PCB developed in EasyEDA. Integrated Arduino Nano, QTR-8A IR sensor array, N20 motors, and DRV8835 motor driver with optimized PID control for precise tracking on complex tracks.",
    tags: ["Arduino Nano", "Custom PCB", "EasyEDA", "PID", "QTR-8A", "DRV8835"],
    icon: "/projects/line_following_icon.png",
  },
  {
    name: "Pipe Inspection Robot",
    desc: "Engineered a tripod-structured pipe inspection robot for safe navigation inside narrow pipelines. Implemented crack detection via image processing, odometry for distance tracking, and a real-time monitoring system for safety inspection.",
    tags: ["Raspberry Pi", "Image Processing", "Crack Detection", "Odometry", "Python"],
    icon: "/projects/pipe_inspection_icon.png",
  },
  {
    name: "Smart Bike Accident Alert",
    desc: "Developed an intelligent accident detection system using ESP32, MPU6050, SIM800L GSM, and Neo-6M GPS. Implemented impact detection with user-confirmation via emergency button; automatically sends real-time GPS location to registered contacts if no response within a defined time frame.",
    tags: ["ESP32", "MPU6050", "SIM800L", "Neo-6M GPS", "GSM", "IoT"],
    icon: "/projects/bike_accident_icon.png",
  },
];

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.map((proj, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-3xl p-6 flex flex-col gap-4 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
          >
            {/* Icon + Title */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center shrink-0 overflow-hidden shadow-lg shadow-black/20 group-hover:shadow-primary/20 transition-all duration-300 p-2">
                <Image
                  src={proj.icon}
                  alt={proj.name}
                  fill
                  className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                  unoptimized
                />
              </div>
              <h3 className="font-black uppercase tracking-tight text-sm leading-snug text-foreground group-hover:text-primary transition-colors">
                {proj.name}
              </h3>
            </div>

            {/* Divider */}
            <div className="h-px bg-black/5 w-full" />

            {/* Description */}
            <p className="text-xs text-foreground/60 font-medium leading-relaxed flex-grow">
              {proj.desc}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {proj.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-black uppercase tracking-widest bg-primary/5 text-primary px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
