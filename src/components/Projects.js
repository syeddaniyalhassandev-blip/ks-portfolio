"use client";

import Section from "./Section";
import { motion } from "framer-motion";
import {
  Car,
  Sword,
  Factory,
  Bot,
  Home,
  Flame,
  Route,
  ScanLine,
  BellRing,
} from "lucide-react";

const projectsData = [
  {
    name: "Remote Controlled Car",
    desc: "Built a 4WD RC car with custom chassis, L298N motor driver, and RF remote control. Implemented forward, reverse, and differential steering.",
    tags: ["Arduino", "L298N", "RF Module", "C++"],
    Icon: Car,
  },
  {
    name: "Light Weight RoboWar",
    desc: "Designed and fabricated a combat robot for RoboWar competition. Focused on weapon mechanism, armour plating, and drive system optimization.",
    tags: ["Mechatronics", "SolidWorks", "Motor Control", "Fabrication"],
    Icon: Sword,
  },
  {
    name: "Motor & Motion Automation",
    desc: "Developed a PLC-based motor control system using Siemens S7-1200 with SCADA interface for real-time monitoring and speed control.",
    tags: ["Siemens PLC", "TIA Portal", "SCADA", "Automation"],
    Icon: Factory,
  },
  {
    name: "Soccer Robot",
    desc: "Engineered an autonomous soccer-playing robot with IR sensors for ball detection and omni-wheels for multi-directional movement.",
    tags: ["Arduino", "IR Sensors", "Omni-Wheels", "C++"],
    Icon: Bot,
  },
  {
    name: "Home Automation",
    desc: "Implemented IoT-based home automation using ESP32 with relay modules. Controlled appliances via mobile app over Wi-Fi.",
    tags: ["ESP32", "IoT", "Wi-Fi", "Relay"],
    Icon: Home,
  },
  {
    name: "Fire & Safety System",
    desc: "Built an automated fire detection and suppression system using flame sensors, MQ-2 gas sensor, and servo-controlled water pump.",
    tags: ["Arduino", "Flame Sensor", "MQ-2", "Servo"],
    Icon: Flame,
  },
  {
    name: "Line Following Robot",
    desc: "Programmed a PID-controlled LFR using IR sensor array for precision path tracking on complex tracks.",
    tags: ["Arduino", "PID", "IR Array", "C++"],
    Icon: Route,
  },
  {
    name: "Pipe Inspection Robot",
    desc: "Designed a miniature robot for pipe inspection with live camera feed, LED lighting, and differential drive for navigating narrow pipelines.",
    tags: ["Raspberry Pi", "Camera", "Python", "Drive System"],
    Icon: ScanLine,
  },
  {
    name: "Bike Accident Indication",
    desc: "Developed a safety system using MPU6050 accelerometer to detect sudden falls and send GPS coordinates via GSM module.",
    tags: ["Arduino", "MPU6050", "GPS", "GSM"],
    Icon: BellRing,
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
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <proj.Icon className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-black uppercase tracking-tight text-sm leading-snug text-foreground group-hover:text-primary transition-colors mt-1.5">
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
