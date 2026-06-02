import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playHover, playClick } from '../utils/sounds';
import { achievementsData } from '../data/achievementsData';
import type { Achievement } from '../data/achievementsData';
import { 
  Compass, Play, Pause, ZoomIn, ArrowRight, 
  ArrowLeft, Download, ExternalLink, Cpu 
} from 'lucide-react';

// ─── Interfaces ──────────────────────────────────────────────────────────────

interface PlanetConfig {
  name: 'Internships' | 'Courses' | 'Hackathons' | 'Workshops' | 'Competitions' | 'Badges';
  color: string;
  glowColor: string;
  emoji: string;
  description: string;
  rx: number; // Orbit Radius X
  ry: number; // Orbit Radius Y
  speed: number;
}

interface SystemMoon {
  id: string;
  name: string;
  achievement: Achievement;
  color: string;
  angle: number;
  relRx: number; // Relative radius orbit X
  relRy: number; // Relative radius orbit Y
  speed: number;
}

interface SpaceWarpStar {
  x: number;
  y: number;
  z: number;
  length: number;
}

// ─── Custom Brand Settings ───────────────────────────────────────────────────

const profiles = [
  {
    name: 'GitHub',
    url: 'https://github.com/VIJAYAPANDIANT',
    colorClass: 'hover:text-white hover:border-white hover:shadow-[0_0_12px_rgba(255,255,255,0.4)]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/vijayapandian-t/',
    colorClass: 'hover:text-[#0077b5] hover:border-[#0077b5] hover:shadow-[0_0_12px_rgba(0,119,181,0.45)]',
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
      </svg>
    ),
  },
  {
    name: 'Unstop',
    url: 'https://unstop.com/u/vijayt90718',
    colorClass: 'hover:text-[#1c4980] hover:border-[#1c4980] hover:shadow-[0_0_12px_rgba(28,73,128,0.45)]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 0C5.394 0 0 5.394 0 12s5.394 12 12 12 12-5.394 12-12S18.606 0 12 0Zm-1.2 16.86H8.303v-1.127c-.715 1.091-1.588 1.552-2.897 1.552-2.085 0-3.248-1.2-3.248-3.333V7.248h2.509v6.182c0 1.164.533 1.722 1.6 1.722 1.224 0 2.012-.752 2.012-1.891V7.236h2.509v9.625zm8.533 0v-5.939c0-1.14-.533-1.721-1.6-1.721-1.224 0-2.012.752-2.012 1.89v5.77h-2.509V7.237h2.497V8.63c.715-1.09 1.588-1.551 2.897-1.551 2.085 0 3.249 1.2 3.249 3.333v6.449z"/>
      </svg>
    ),
  },
  {
    name: 'Twitter (X)',
    url: 'https://x.com/Vijayapand33371',
    colorClass: 'hover:text-white hover:border-white hover:shadow-[0_0_12px_rgba(255,255,255,0.4)]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'LeetCode',
    url: 'https://leetcode.com/u/hackervj18/',
    colorClass: 'hover:text-[#ffa116] hover:border-[#ffa116] hover:shadow-[0_0_12px_rgba(255,161,22,0.45)]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
  },
  {
    name: 'GeeksforGeeks',
    url: 'https://www.geeksforgeeks.org/profile/vijayapandiant11',
    colorClass: 'hover:text-[#308b50] hover:border-[#308b50] hover:shadow-[0_0_12px_rgba(48,139,80,0.45)]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M21.45 14.315c-.143.28-.334.532-.565.745a3.691 3.691 0 0 1-1.104.695 4.51 4.51 0 0 1-3.116-.016 3.79 3.79 0 0 1-2.135-2.078 3.571 3.571 0 0 1-.13-.353h7.418a4.26 4.26 0 0 1-.368 1.008zm-11.99-.654a3.793 3.793 0 0 1-2.134 2.078 4.51 4.51 0 0 1-3.117.016 3.7 3.7 0 0 1-1.104-.695 2.652 2.652 0 0 1-.564-.745 4.221 4.221 0 0 1-.368-1.006H9.59c-.038.12-.08.238-.13.352zm14.501-1.758a3.849 3.849 0 0 0-.082-.475l-9.634-.008a3.932 3.932 0 0 1 1.143-2.348c.363-.35.79-.625 1.26-.809a3.97 3.97 0 0 1 4.484.957l1.521-1.49a5.7 5.7 0 0 0-1.922-1.357 6.283 6.283 0 0 0-2.544-.49 6.35 6.35 0 0 0-2.405.457 6.007 6.007 0 0 0-1.963 1.276 6.142 6.142 0 0 0-1.325 1.94 5.862 5.862 0 0 0-.466 1.864h-.063a5.857 5.857 0 0 0-.467-1.865 6.13 6.13 0 0 0-1.325-1.939A6 6 0 0 0 8.21 6.34a6.698 6.698 0 0 0-4.949.031A5.708 5.708 0 0 0 1.34 7.73l1.52 1.49a4.166 4.166 0 0 1 4.484-.958c.47.184.898.46 1.26.81.368.36.66.792.859 1.268.146.344.242.708.285 1.08l-9.635.008A4.714 4.714 0 0 0 0 12.457a6.493 6.493 0 0 0 .345 2.127 4.927 4.927 0 0 0 1.08 1.783c.528.56 1.17 1 1.88 1.293a6.454 6.454 0 0 0 2.504.457c.824.005 1.64-.15 2.404-.457a5.986 5.986 0 0 0 1.964-1.277 6.116 6.116 0 0 0 1.686-3.076h.273a6.13 6.13 0 0 0 1.686 3.077 5.99 5.99 0 0 0 1.964 1.276 6.345 6.345 0 0 0 2.405.457 6.45 6.45 0 0 0 2.502-.457 5.42 5.42 0 0 0 1.882-1.293 4.928 4.928 0 0 0 1.08-1.783A6.52 6.52 0 0 0 24 12.457a4.757 4.757 0 0 0-.039-.554z" />
      </svg>
    ),
  },
  {
    name: 'Codeforces',
    url: 'https://codeforces.com/profile/vijayapandian112007',
    colorClass: 'hover:text-[#318dec] hover:border-[#318dec] hover:shadow-[0_0_12px_rgba(49,141,236,0.45)]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.673 21 0 20.328 0 19.5V9c0-.828.673-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.827 0-1.5-.672-1.5-1.5v-15c0-.828.673-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z" />
      </svg>
    ),
  },
  {
    name: 'CodeChef',
    url: 'https://www.codechef.com/users/vijay_code07',
    colorClass: 'hover:text-[#d3a275] hover:border-[#d3a275] hover:shadow-[0_0_12px_rgba(211,162,117,0.45)]',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M11.2574.0039c-.37.0101-.7353.041-1.1003.095C9.6164.153 9.0766.4236 8.482.694c-.757.3244-1.5147.6486-2.2176.7027-1.1896.3785-1.568.919-1.8925 1.3516 0 .054-.054.1079-.054.1079-.4325.865-.4873 1.73-.325 2.5952.1621.5407.3786 1.0282.5408 1.5148.3785 1.0274.7578 2.0007.92 3.1362.1622.3244.3235.7571.4316 1.1897.2704.8651.542 1.8383 1.353 2.5952l.0057-.0028c.0175.0183.0301.0387.0482.0568.0072-.0036.0141-.0063.0213-.0099l-.0213-.5849c.6489-.9733 1.5673-1.6221 2.865-1.8925.5195-.1093 1.081-.1497 1.6625-.1278a8.7733 8.7733 0 0 1 1.7988.2357c1.4599.3785 2.595 1.1358 2.6492 1.7846.0273.3549.0398.6952.0326 1.0364-.001.064-.0046.1285-.007.193l.1362.0682c.075-.0375.1424-.107.2059-.1902.0008-.001.002-.002.0028-.0028.0018-.0023.0039-.0061.0057-.0085.0396-.0536.0747-.1236.1107-.1931.0188-.0377.0372-.0866.0554-.1292.2048-.4622.362-1.1536.538-1.9635.0541-.2703.1092-.4864.1633-.7027.4326-.9733 1.0266-1.8382 1.6213-2.6492.9733-1.3518 1.8928-2.5962 1.7846-4.0561-1.784-3.4608-4.2718-4.0017-5.5695-4.272-.2163-.0541-.3233-.0539-.4856-.108-1.3382-.2433-2.4945-.3953-3.6046-.3648zm5.0428 14.3788a9.8602 9.8602 0 0 0-.0326-.9824c-.0541-.703-1.1892-1.46-2.7032-1.8386-.588-.1336-1.1764-.2142-1.7448-.2356-.539-.0137-1.0657.0248-1.5546.1277-1.2436.2704-2.2162.9193-2.811 1.8925l.0511 1.431c.6672-.3558 1.7326-.8747 3.139-.9994.0662-.0059.1368-.0059.2044-.0099.1177-.013.2667-.044.4444-.044 1.6075 0 3.2682.5336 4.8767 1.6483.039-.2744.0611-.549.071-.8234l.044.0227c.0028-.0622.0143-.1268.0156-.1888zM11.256.0578c.1239-.0034.2538.01.379.0114-.23-.0022-.4588.0026-.6871.0156.103-.0061.2046-.0242.308-.027zm.4983.0156c.6552.014 1.3255.0711 2.0387.1803-.6834-.0987-1.3646-.1671-2.0387-.1803zm-1.3147.0554c-.076.0087-.1527.0133-.2285.0241-.8168.1167-1.7742.7015-2.75 1.045.3545-.1323.7143-.2957 1.0747-.4501C9.0765.4774 9.6705.207 10.1571.1529c.0939-.0139.1886-.0133.2825-.0241zm-.2285.24c.1622 0 .3787-.0002.5409.0539-.1425-.0357-.2595-.026-.3706-.0142a1.174 1.174 0 0 1 .3166.0681c.5796 1.0012-.4264 5.2791-.6786 8.1492.1559 1.0276.3138 1.9963.4628 2.7201-.7029-1.7843-1.4067-4.921-1.5148-7.354-.054-.9733.001-1.8386.2172-2.4874C9.401.8557 9.7244.4228 10.2111.3687zm3.1361.271c-.811 2.1088-.9184 6.1092-.9725 7.3528-.054.5407-.0001 1.73.054 2.5952 0 .2163.054.4325.054.6488 0-.2163-.054-.3786-.054-.5948-.4326-3.2442-.974-7.1362.9185-10.002zm3.352.3777c-.2704 2.1628-1.4047 3.191-1.7832 5.2998-.1081 1.6762-.325 3.6222-.379 5.2984-.0541-1.6762-.0007-3.4601.2697-5.2444.2703-1.8384.8651-3.6776 1.8925-5.3538zm-10.381.433c-.3581.1194-.632.248-.8575.3805.2317-.1358.4996-.2666.8575-.3805zm.2101.1974c.2155.0025.4384.0734.6006.2357-.0067-.004-.0078-.0033-.0142-.0071.1331.0929.2666.2093.3932.3847-.2036.9673.2553 3.0317.0398 4.6694.0763 1.5485.0717 3.1804.849 4.4594-.9796-1.5107-1.176-3.4375-1.3218-5.236-.1128-1.0907-.2035-2.0969-.4642-2.9033-.144-.3047-.2684-.5745-.3833-.822-.0247-.0369-.0447-.0784-.071-.1135-.1082-.1082-.1619-.2696-.1619-.3777 0-.054.0539-.1618.108-.1618.054-.054.0539-.1618.108-.1618.054-.054.0539-.1618.108-.1618.054-.054.1616-.0553.2157-.1094a1.013 1.013 0 0 1 .2101-.0184zm-1.3459.6133c-.0604.0201-.0923.041-.1405.061.1768-.034.3617.0339.5196.318-.1877.8916.4364 3.3685.4288 5.104.3124 1.8478.5496 3.8498 1.5716 5.1152C6.3723 11.5076 5.886 9.1286 5.5076 7.128 5.183 5.56 4.9125 4.2086 4.3718 3.776c-.054-.1081-.1079-.163-.1079-.2711 0-.1622-.0002-.3786.1079-.5949-.2772.6337-.4047 1.2673-.3706 1.901-.0445-.6487.0857-1.2905.3706-1.901 0-.054.054-.0538.054-.1079.012-.016.0314-.0349.044-.0511.0618-.0983.1308-.189.2257-.257.0557-.0615.0965-.1191.159-.1817-.0526.0555-.0872.1092-.1335.1647.0273-.018.0523-.0368.0838-.0525.1081-.1082.2154-.1633.3776-.1633zm-.3776.1633c-.0038.0075-.0076.0111-.0114.0184.0125-.0099.0242-.0208.037-.0298-.0074.0037-.0182.0077-.0256.0114zm14.7608 1.1343c-.0017.0052-.004.0104-.0057.0156.0378-.005.0751-.0173.1135-.0156-.0378-.0022-.0763.0103-.115.0199-.8634 2.6418-1.8874 5.2844-2.9118 7.9262a.0184.0184 0 0 1-.0015.0028c-.0874.4652-.234.8842-.5395 1.1898.4326-.4867.4854-1.1907.5395-2.0558.054-.811.0544-1.6761.487-2.5413 0-.0531.0012-.1058.0525-.159.0003-.0009.0012-.0019.0015-.0028.0973-.3524.202-.6885.3166-1.018.4183-1.2896 1.1396-3.1653 2.0131-3.3405.0163-.0052.034-.018.0497-.0213zM8.3726 16.2113l-.3238.1079c.1623.2163.2696.379.3777.433.1081.054.2168.108.379.108.0541 0 .1618 0 .2159-.054l.812-.2698c.0541 0 .1078-.054.1619-.054.1081 0 .1616 0 .2697.054l.2712.2698.2697-.054c-.1081-.1622-.2695-.3236-.3776-.3776-.1082-.0541-.2169-.1094-.379-.1094h-.108l-.866.3252h-.1618c-.1082 0-.2157 0-.2698-.054-.054-.054-.163-.1629-.2712-.3251zm-2.5953.541c-.2703.1621-.649.4324-1.1897.6487-.5407.2163-.9734.4325-1.1897.6488-.2163.2163-.3237.4326-.3237.6488 0 .1082.0537.1632.1618.2172.054.0541.1632.0539.2172.108.757.3244 1.5133.7019 2.2162 1.0803.1082.0541.2171.1632.2712.2173.054.054.1078.054.1618.054.1082 0 .2695-.0538.3777-.162.1081-.108.1632-.217.1632-.325 0-.1082-.055-.1618-.1632-.2158 0 0-.4328-.2165-1.1898-.541-.4866-.2162-.9179-.4326-1.1883-.5948.1623-.2704.486-.4865.9726-.7028.5407-.2163.9196-.4326 1.0818-.5948.054-.0541.054-.1078.054-.1619 0-.054-.0539-.1631-.108-.2172-.054-.054-.163-.1079-.2711-.1079zm11.247 0c-.054 0-.1618.0537-.2158.1078-.0541.1081-.1093.1632-.1093.2172v.054c.1622.1622.3797.2695.7041.3776.2704.054.5403.1632.8107.2172.3244.1082.5407.2693.6488.4856v.0553c0 .0541-.1088.1616-.3251.2698-.1082.054-.3245.2167-.5949.433-.2703.1622-.4326.3236-.5948.3776-.2163.1082-.3776.217-.4316.3252-.0541.054-.054.1077-.054.1618 0 .1081.0539.1077.108.2158.054.1081.1616.1093.2157.1093.054 0 .1078-.0554.1619-.0554.2703-.1622.6492-.3782 1.0818-.7567.4866-.3784.8655-.6484 1.0818-.8106.2163-.1082.3237-.2169.3237-.379 0-.0541.0002-.1618-.1079-.2159-.3785-.4325-.9185-.7022-1.5674-.9185-.1081-.0541-.2704-.1092-.5948-.1633-.1622-.054-.3249-.1079-.433-.1079zm-2.9743.8106c-.2704 0-.4866.055-.6488.2172-.2163.1622-.2699.4323-.2158.7567 0 .2703.1075.4865.2697.7027.1622.2163.3786.3252.5949.3252.1622 0 .2708-.0553.433-.1094.2703-.1622.379-.4319.379-.9185 0-.3785-.109-.6485-.2711-.8107-.1622-.1081-.3246-.1632-.541-.1632zm-4.4877.054c-.2704 0-.4866.055-.6488.2171-.2163.1622-.27.4323-.2158.7567 0 .2704.1075.4865.2697.7028s.3786.3251.5949.3251c.1622 0 .2708-.0552.433-.1093.2703-.1622.3776-.432.3776-.9186 0-.4325-.1075-.7025-.2697-.8106-.1622-.1082-.3247-.1633-.541-.1633zm0 .6501c.1622 0 .2711.1076.2711.2698 0 .1622-.163.2697-.2711.2697-.1622 0-.2698-.1075-.2698-.2697s.1076-.2698.2698-.2698zm4.3798.054c.1622 0 .2711.1075.2711.2697 0 .1082-.109.2698-.2711.2698-.1622 0-.2698-.1076-.2698-.2698 0-.1622.1076-.2697.2698-.2697zm-2.7032 2.1083l.1619.3237c.054.1081.1076.163.2158.2711.054.054.163.1619.2712.1619h.1078c.1082 0 .1618 0 .2158-.054.0541-.054.1632-.0538.2173-.1079l.1618-.1618c.054-.054.108-.1092.108-.1633.054-.054.0537-.1078.1078-.1618 0-.0541.054-.108.054-.108-.0541.1082-.1618.2156-.2158.3238-.1082.054-.1616.1632-.2698.1632-.1081.0541-.217.054-.3251.054s-.2157.0001-.2697-.054c-.1082 0-.1632-.0538-.2173-.1079l-.1618-.1632c-.054-.0541-.1078-.1618-.1619-.2158zm-.866 1.0278c-1.1355 0-1.8377 1.5136-3.4598.1619-.4326 2.6494 2.7583 2.866 4.11 1.7306.9192-.811.6475-1.9465-.6502-1.8925zm2.8664 0c-1.2977-.054-1.568 1.0815-.6488 1.8925 1.3518 1.1355 4.5412.9188 4.1087-1.7306-1.6221 1.3517-2.2703-.1619-3.4599-.1619z" />
      </svg>
    ),
  },
];

const categoryPlanetConfigs: PlanetConfig[] = [
  {
    name: 'Internships',
    color: '#10b981', // Emerald Green
    glowColor: 'rgba(16, 185, 129, 0.45)',
    emoji: '💼',
    description: 'Industry and research experiences',
    rx: 230,
    ry: 130,
    speed: 0.0018,
  },
  {
    name: 'Courses',
    color: '#3b82f6', // Blue
    glowColor: 'rgba(59, 130, 246, 0.45)',
    emoji: '📚',
    description: 'Verified academic coursework',
    rx: 310,
    ry: 180,
    speed: 0.0012,
  },
  {
    name: 'Hackathons',
    color: '#f97316', // Orange
    glowColor: 'rgba(249, 115, 22, 0.45)',
    emoji: '🏆',
    description: 'Product builds & fast prototyping',
    rx: 400,
    ry: 230,
    speed: 0.0009,
  },
  {
    name: 'Workshops',
    color: '#06b6d4', // Cyan
    glowColor: 'rgba(6, 182, 212, 0.45)',
    emoji: '🎓',
    description: 'Bootcamps & professional training',
    rx: 490,
    ry: 280,
    speed: 0.0007,
  },
  {
    name: 'Competitions',
    color: '#ef4444', // Red
    glowColor: 'rgba(239, 68, 68, 0.45)',
    emoji: '⚔',
    description: 'Competitive coding & challenges',
    rx: 580,
    ry: 330,
    speed: 0.0005,
  },
  {
    name: 'Badges',
    color: '#a855f7', // Purple
    glowColor: 'rgba(168, 85, 247, 0.45)',
    emoji: '🔰',
    description: 'Gaming style skill accomplishments',
    rx: 670,
    ry: 380,
    speed: 0.0004,
  },
];

interface UniverseProps {
  onSelectCategory: (category: string) => void;
}

export const Universe: React.FC<UniverseProps> = ({ onSelectCategory }) => {
  const canvas2DRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // States
  const [hoveredNode, setHoveredNode] = useState<{ name: string; stat: string; description: string; color: string; glowColor: string } | null>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  
  // Custom HUD controls
  const [orbitalSpeedScale, setOrbitalSpeedScale] = useState<number>(1.0); // Gravity Control
  const [zoomLevel, setZoomLevel] = useState<number>(0.95); // System Zoom
  const [showOrbits, setShowOrbits] = useState<boolean>(true);
  const [showConstellations, setShowConstellations] = useState<boolean>(false);
  const [tourMode, setTourMode] = useState<boolean>(false);
  const [tourIndex, setTourIndex] = useState<number>(0);
  const [activePlanetFilters, setActivePlanetFilters] = useState<string[]>(['Internships', 'Courses', 'Hackathons', 'Workshops', 'Competitions', 'Badges']);

  // Refs for animation parameters to read in real-time
  const controlsRef = useRef({
    speed: 1.0,
    zoom: 0.95,
    showOrbits: true,
    showConstellations: false,
    activeFilters: ['Internships', 'Courses', 'Hackathons', 'Workshops', 'Competitions', 'Badges'],
    tourMode: false,
    tourIndex: 0,
    selectedAchievement: null as Achievement | null,
  });

  useEffect(() => {
    controlsRef.current.speed = orbitalSpeedScale;
    controlsRef.current.zoom = zoomLevel;
    controlsRef.current.showOrbits = showOrbits;
    controlsRef.current.showConstellations = showConstellations;
    controlsRef.current.activeFilters = activePlanetFilters;
    controlsRef.current.tourMode = tourMode;
    controlsRef.current.tourIndex = tourIndex;
    controlsRef.current.selectedAchievement = selectedAchievement;
  }, [orbitalSpeedScale, zoomLevel, showOrbits, showConstellations, activePlanetFilters, tourMode, tourIndex, selectedAchievement]);

  // Chronologically sorted achievements for the Constellation & Tour Autopilot
  const chronologicalAchievements = useMemo(() => {
    return [...achievementsData].sort(
      (a, b) => new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime()
    );
  }, []);

  const getStats = (cat: string) => {
    return achievementsData.filter((a) => a.category === cat).length.toString();
  };

  // Avatar image loaded check
  const avatarImageRef = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    const img = new Image();
    img.src = '/avatar.jpg';
    img.onload = () => {
      avatarImageRef.current = img;
    };
  }, []);

  // Main Galaxy Animation Loop
  useEffect(() => {
    const canvas = canvas2DRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);
    let animationId: number;

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    // Coordinate camera systems
    const camera = {
      x: 0,
      y: 0,
      zoom: 0.95,
      targetX: 0,
      targetY: 0,
      targetZoom: 0.95,
      isWarping: false,
      warpAlpha: 0,
    };

    // System base orbit angle
    let galaxyBaseAngle = 0;
    let latestRenderingList: any[] = [];
    let orbitRotationOffset = 0; // Managed by mouse dragging
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;

    // Build space warp stars
    const warpStars: SpaceWarpStar[] = [];
    for (let i = 0; i < 180; i++) {
      warpStars.push({
        x: (Math.random() - 0.5) * 1200,
        y: (Math.random() - 0.5) * 1000,
        z: Math.random() * 1000,
        length: 2 + Math.random() * 8,
      });
    }

    // Solar flares angles for sun coronal discharges
    const flares: number[] = [];
    for (let i = 0; i < 12; i++) {
      flares.push(Math.random() * Math.PI * 2);
    }

    // Moons mapping setup relative to planets
    const getMoonsForCategory = (catName: string, planetColor: string): SystemMoon[] => {
      const catAchievements = achievementsData.filter(a => a.category === catName);
      return catAchievements.map((item, idx) => {
        const count = catAchievements.length;
        const angle = (idx * Math.PI * 2) / (count || 1);
        return {
          id: item.id,
          name: item.title,
          achievement: item,
          color: planetColor,
          angle,
          relRx: 52, // moon relative orbit radius X
          relRy: 32, // moon relative orbit radius Y
          speed: 0.009 + Math.random() * 0.006,
        };
      });
    };

    // Store planet base angles and moon speeds
    const planetAngles = categoryPlanetConfigs.map(() => Math.random() * Math.PI * 2);
    const planetMoons = categoryPlanetConfigs.map((cfg) => getMoonsForCategory(cfg.name, cfg.color));

    // Particle trace tails for moons
    const moonTailParticles: { x: number; y: number; color: string; alpha: number }[] = [];

    // Track active interactions
    const mousePos = { x: 0, y: 0 };
    let hoveredObjectId: string | null = null;
    let hoveredObjectType: 'planet' | 'moon' | 'sun' | null = null;

    // Draw Coronal flare paths
    const drawSunCoronalFlares = (cx: number, cy: number, radius: number, time: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.shadowBlur = 35;
      ctx.shadowColor = '#06b6d4';
      ctx.fillStyle = 'rgba(6, 182, 212, 0.09)';

      flares.forEach((angle, idx) => {
        // Rotate flare slowly over time
        const currentAngle = angle + time * 0.004 * (idx % 2 === 0 ? 1 : -1);
        const flareLength = radius * (1.1 + Math.sin(time * 0.02 + idx) * 0.2);
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(currentAngle - 0.18) * radius * 0.8, Math.sin(currentAngle - 0.18) * radius * 0.8);
        ctx.lineTo(Math.cos(currentAngle) * flareLength, Math.sin(currentAngle) * flareLength);
        ctx.lineTo(Math.cos(currentAngle + 0.18) * radius * 0.8, Math.sin(currentAngle + 0.18) * radius * 0.8);
        ctx.closePath();
        ctx.fill();
      });
      ctx.restore();
    };

    // ─── MAIN ANIMATION FRAME ─────────────────────────────────────────────────
    const animateUniverse = () => {
      ctx.clearRect(0, 0, width, height);
      const time = Date.now();

      // Read real-time control parameters
      const cfgSpeed = controlsRef.current.speed;
      const cfgZoom = controlsRef.current.zoom;
      const cfgShowOrbits = controlsRef.current.showOrbits;
      const cfgShowConstellations = controlsRef.current.showConstellations;
      const cfgFilters = controlsRef.current.activeFilters;
      const cfgTourMode = controlsRef.current.tourMode;
      const cfgTourIndex = controlsRef.current.tourIndex;

      // Slowly increment base orbit angle
      galaxyBaseAngle += 0.0018 * cfgSpeed;

      // Autopilot Tour Camera Lock-on
      if (cfgTourMode && chronologicalAchievements[cfgTourIndex]) {
        const targetAchievement = chronologicalAchievements[cfgTourIndex];
        // Locate coordinates of this achievement moon in system space
        let foundX = 0;
        let foundY = 0;
        
        categoryPlanetConfigs.forEach((pCfg, pIdx) => {
          if (pCfg.name === targetAchievement.category) {
            const currentAngle = planetAngles[pIdx] + galaxyBaseAngle + orbitRotationOffset;
            const px = pCfg.rx * Math.cos(currentAngle);
            const py = pCfg.ry * Math.sin(currentAngle);

            const moons = planetMoons[pIdx];
            const mIdx = moons.findIndex(m => m.id === targetAchievement.id);
            if (mIdx !== -1) {
              const m = moons[mIdx];
              const moonAngle = m.angle + (time * 0.001 * m.speed * cfgSpeed);
              foundX = px + m.relRx * Math.cos(moonAngle);
              foundY = py + m.relRy * Math.sin(moonAngle);
            }
          }
        });

        camera.targetX = foundX;
        camera.targetY = foundY;
        camera.targetZoom = 1.95; // Extreme close-up focusing

        const distance = Math.hypot(camera.targetX - camera.x, camera.targetY - camera.y);
        if (distance > 18) {
          camera.isWarping = true;
          camera.warpAlpha += (1 - camera.warpAlpha) * 0.1;
        } else {
          camera.isWarping = false;
          camera.warpAlpha += (0 - camera.warpAlpha) * 0.15;
        }
      } else {
        // Standard Galaxy view mapping
        camera.targetX = 0;
        camera.targetY = 0;
        camera.targetZoom = cfgZoom;
        camera.isWarping = false;
        camera.warpAlpha += (0 - camera.warpAlpha) * 0.15;
      }

      // Camera coordinates smooth interpolation
      camera.x += (camera.targetX - camera.x) * 0.08;
      camera.y += (camera.targetY - camera.y) * 0.08;
      camera.zoom += (camera.targetZoom - camera.zoom) * 0.08;

      // Projection parameters helper
      const project = (sysX: number, sysY: number) => {
        return {
          x: width / 2 + (sysX - camera.x) * camera.zoom,
          y: height / 2 + (sysY - camera.y) * camera.zoom,
        };
      };

      // 1. Draw Space Warp Streaks in warp mode
      if (camera.warpAlpha > 0.01) {
        ctx.strokeStyle = `rgba(6, 182, 212, ${camera.warpAlpha * 0.35})`;
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#06b6d4';
        
        warpStars.forEach(star => {
          star.z -= 28; // move star closer
          if (star.z <= 0) {
            star.z = 1000;
            star.x = (Math.random() - 0.5) * 1200;
            star.y = (Math.random() - 0.5) * 1000;
          }
          
          // Project star coordinates
          const k = 450 / star.z;
          const px = star.x * k + width / 2;
          const py = star.y * k + height / 2;
          
          const prevK = 450 / (star.z + star.length * 2.5);
          const ppx = star.x * prevK + width / 2;
          const ppy = star.y * prevK + height / 2;
          
          ctx.beginPath();
          ctx.moveTo(ppx, ppy);
          ctx.lineTo(px, py);
          ctx.stroke();
        });
        ctx.shadowBlur = 0;
      }

      // 2. Draw Guides / Orbital Ellipses for Category Planets
      if (cfgShowOrbits) {
        categoryPlanetConfigs.forEach((pCfg) => {
          if (!cfgFilters.includes(pCfg.name)) return;
          ctx.save();
          ctx.translate(width / 2 - camera.x * camera.zoom, height / 2 - camera.y * camera.zoom);
          ctx.strokeStyle = `${pCfg.color}15`; // faint guide line
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.ellipse(0, 0, pCfg.rx * camera.zoom, pCfg.ry * camera.zoom, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        });
      }

      // 3. Compute System elements coordinates
      const renderingList: any[] = [];

      // A. The Sun (Central Star Vijayapandian T)
      const sunProj = project(0, 0);
      renderingList.push({
        type: 'sun',
        id: 'sun-core',
        name: 'Vijayapandian T',
        sysX: 0,
        sysY: 0,
        x: sunProj.x,
        y: sunProj.y,
        size: 45 * camera.zoom,
      });

      // B. Category Planets & nested satellites
      categoryPlanetConfigs.forEach((pCfg, idx) => {
        if (!cfgFilters.includes(pCfg.name)) return;
        const currentAngle = planetAngles[idx] + galaxyBaseAngle + orbitRotationOffset;
        const planetSysX = pCfg.rx * Math.cos(currentAngle);
        const planetSysY = pCfg.ry * Math.sin(currentAngle);
        const planetProj = project(planetSysX, planetSysY);

        const zScale = (Math.sin(currentAngle) + 2.5) / 3.5; // Depth perspective size scaling (0.4 to 1.0)
        const planetSize = 24 * zScale * camera.zoom;

        renderingList.push({
          type: 'planet',
          id: pCfg.name,
          name: pCfg.name,
          config: pCfg,
          sysX: planetSysX,
          sysY: planetSysY,
          x: planetProj.x,
          y: planetProj.y,
          size: planetSize,
          zScale,
        });

        // Satellites/Moons Orbiting this planet
        const moons = planetMoons[idx];
        moons.forEach((m) => {
          const moonAngle = m.angle + (time * 0.001 * m.speed * cfgSpeed);
          const moonSysX = planetSysX + m.relRx * Math.cos(moonAngle);
          const moonSysY = planetSysY + m.relRy * Math.sin(moonAngle);
          const moonProj = project(moonSysX, moonSysY);
          const moonSize = 9 * zScale * camera.zoom;

          renderingList.push({
            type: 'moon',
            id: m.id,
            name: m.name,
            achievement: m.achievement,
            color: pCfg.color,
            sysX: moonSysX,
            sysY: moonSysY,
            x: moonProj.x,
            y: moonProj.y,
            size: moonSize,
            parentPlanet: pCfg.name,
          });

          // Spawn trailing dust sparks for moons
          if (frame % 3 === 0 && cfgSpeed > 0 && Math.random() > 0.4) {
            moonTailParticles.push({
              x: moonProj.x + (Math.random() - 0.5) * 3,
              y: moonProj.y + (Math.random() - 0.5) * 3,
              color: pCfg.color,
              alpha: 0.95,
            });
          }
        });
      });

      // 4. Render Moon Tail particles
      ctx.save();
      for (let i = moonTailParticles.length - 1; i >= 0; i--) {
        const p = moonTailParticles[i];
        p.alpha -= 0.035;
        if (p.alpha <= 0) {
          moonTailParticles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      // 5. Draw Timeline Constellation Path (Connect moons chronologically)
      if (cfgShowConstellations && chronologicalAchievements.length > 1) {
        ctx.save();
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)'; // glowing purple
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#a855f7';
        ctx.beginPath();

        let drewFirst = false;
        chronologicalAchievements.forEach((ach) => {
          // Find projected coordinates for this achievement moon
          const activeMoonNode = renderingList.find(node => node.type === 'moon' && node.id === ach.id);
          if (activeMoonNode) {
            if (!drewFirst) {
              ctx.moveTo(activeMoonNode.x, activeMoonNode.y);
              drewFirst = true;
            } else {
              ctx.lineTo(activeMoonNode.x, activeMoonNode.y);
            }
          }
        });
        ctx.stroke();

        // Draw small numeric order nodes along the constellation path
        let constIndex = 1;
        chronologicalAchievements.forEach((ach) => {
          const activeMoonNode = renderingList.find(node => node.type === 'moon' && node.id === ach.id);
          if (activeMoonNode) {
            ctx.fillStyle = '#a855f7';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(activeMoonNode.x, activeMoonNode.y, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Label
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            ctx.font = '9px monospace';
            ctx.fillText(constIndex.toString(), activeMoonNode.x + 8, activeMoonNode.y + 3);
            constIndex++;
          }
        });
        ctx.restore();
        ctx.shadowBlur = 0;
      }

      // 6. Interactive Ray Vector Beam on Mouse Hover
      let currentHoverId: string | null = null;
      let currentHoverType: 'planet' | 'moon' | 'sun' | null = null;
      
      renderingList.forEach((obj) => {
        const dx = mousePos.x - obj.x;
        const dy = mousePos.y - obj.y;
        const distance = Math.hypot(dx, dy);
        
        // Custom hit box sizes
        const hitBox = obj.type === 'sun' ? obj.size + 10 : obj.size + 14;
        if (distance < hitBox) {
          currentHoverId = obj.id;
          currentHoverType = obj.type;
        }
      });

      // Handle hover trigger sound
      if (currentHoverId !== hoveredObjectId) {
        if (currentHoverId) {
          playHover();
          // Find matching detail info
          if (currentHoverType === 'planet') {
            const planet = categoryPlanetConfigs.find(c => c.name === currentHoverId);
            if (planet) {
              setHoveredNode({
                name: planet.name,
                stat: `${getStats(planet.name)} Achievements`,
                description: planet.description,
                color: planet.color,
                glowColor: planet.glowColor,
              });
            }
          } else if (currentHoverType === 'moon') {
            const targetMoon = renderingList.find(n => n.id === currentHoverId);
            if (targetMoon) {
              setHoveredNode({
                name: targetMoon.name,
                stat: `Platform: ${targetMoon.achievement.issuer}`,
                description: targetMoon.achievement.description,
                color: targetMoon.color,
                glowColor: `rgba(6, 182, 212, 0.4)`,
              });
            }
          } else if (currentHoverType === 'sun') {
            setHoveredNode({
              name: 'VIJAYAPANDIAN T',
              stat: 'CENTRAL OPERATOR STAR',
              description: 'Operator of the Achievement Universe. Drag to rotate the orbital coordinates or use autopilot tour.',
              color: '#06b6d4',
              glowColor: 'rgba(6, 182, 212, 0.4)',
            });
          }
        } else {
          setHoveredNode(null);
        }
        hoveredObjectId = currentHoverId;
        hoveredObjectType = currentHoverType;
      }

      // Draw pointer guides / coordinate beams from Sun to hovered item
      if (hoveredObjectId && hoveredObjectType === 'moon') {
        const activeMoon = renderingList.find(n => n.id === hoveredObjectId);
        if (activeMoon) {
          ctx.save();
          ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(sunProj.x, sunProj.y);
          ctx.lineTo(activeMoon.x, activeMoon.y);
          ctx.stroke();

          // Text coordinates HUD
          ctx.fillStyle = '#06b6d4';
          ctx.font = '8px monospace';
          ctx.fillText(`VECTOR_TGT: [${(activeMoon.sysX).toFixed(0)}, ${(activeMoon.sysY).toFixed(0)}]`, activeMoon.x + 12, activeMoon.y - 12);
          ctx.restore();
        }
      }

      // 7. Depth Occlusion Sorting (2.5D projection layering)
      // Sort elements by Y coordinate so background items are drawn first
      renderingList.sort((a, b) => a.y - b.y);

      // 8. Render All sorted System Objects
      renderingList.forEach((obj) => {
        ctx.save();

        if (obj.type === 'sun') {
          // RENDER THE SUN CORE
          drawSunCoronalFlares(obj.x, obj.y, obj.size, time);

          // Outer dashboard orbit circles
          ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
          ctx.lineWidth = 1;
          ctx.setLineDash([6, 6]);
          ctx.beginPath();
          ctx.arc(obj.x, obj.y, obj.size + 15, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);

          // Glowing sun shell
          const sunGlow = ctx.createRadialGradient(obj.x, obj.y, 0, obj.x, obj.y, obj.size * 1.3);
          sunGlow.addColorStop(0, 'rgba(255, 255, 255, 1)');
          sunGlow.addColorStop(0.3, 'rgba(6, 182, 212, 0.85)');
          sunGlow.addColorStop(0.75, 'rgba(139, 92, 246, 0.35)');
          sunGlow.addColorStop(1, 'rgba(0,0,0,0)');

          ctx.fillStyle = sunGlow;
          ctx.beginPath();
          ctx.arc(obj.x, obj.y, obj.size * 1.3, 0, Math.PI * 2);
          ctx.fill();

          // Avatar Image inside the core sun
          if (avatarImageRef.current) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(obj.x, obj.y, obj.size * 0.75, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(
              avatarImageRef.current,
              obj.x - obj.size * 0.75,
              obj.y - obj.size * 0.75,
              obj.size * 1.5,
              obj.size * 1.5
            );
            ctx.restore();
            
            // Outer metal frame border
            ctx.strokeStyle = '#06b6d4';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(obj.x, obj.y, obj.size * 0.75, 0, Math.PI * 2);
            ctx.stroke();
          } else {
            // Draw placeholder symbol
            ctx.fillStyle = '#030014';
            ctx.font = `bold ${Math.floor(22 * camera.zoom)}px Space Grotesk`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('VJ', obj.x, obj.y);
          }

        } else if (obj.type === 'planet') {
          // RENDER A CATEGORY PLANET
          const isHovered = obj.id === hoveredObjectId;
          ctx.shadowBlur = isHovered ? 24 : 10;
          ctx.shadowColor = obj.config.color;

          // Planetary Core
          const planetGrad = ctx.createRadialGradient(
            obj.x - obj.size * 0.35, obj.y - obj.size * 0.35, 0,
            obj.x, obj.y, obj.size
          );
          planetGrad.addColorStop(0, '#ffffff');
          planetGrad.addColorStop(0.3, obj.config.color);
          planetGrad.addColorStop(1, '#05030f');

          ctx.fillStyle = planetGrad;
          ctx.beginPath();
          ctx.arc(obj.x, obj.y, obj.size, 0, Math.PI * 2);
          ctx.fill();

          // Planet guide rings
          ctx.shadowBlur = 0; // reset
          ctx.strokeStyle = `${obj.config.color}35`;
          ctx.lineWidth = 1;
          ctx.save();
          ctx.translate(obj.x, obj.y);
          ctx.rotate(0.35); // tilt rings
          ctx.beginPath();
          ctx.ellipse(0, 0, obj.size * 1.7, obj.size * 0.45, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();

          // Label text for planet names
          ctx.fillStyle = isHovered ? '#ffffff' : 'rgba(226, 232, 240, 0.75)';
          ctx.font = `${isHovered ? 'bold' : 'normal'} ${Math.floor(10.5 * camera.zoom)}px Space Grotesk`;
          ctx.textAlign = 'center';
          ctx.fillText(obj.name, obj.x, obj.y + obj.size + 14);

        } else if (obj.type === 'moon') {
          // RENDER AN INDIVIDUAL ACHIEVEMENT MOON
          const isHovered = obj.id === hoveredObjectId;
          const currentSelected = controlsRef.current.selectedAchievement;
          const currentTourActive = controlsRef.current.tourMode && chronologicalAchievements[controlsRef.current.tourIndex];
          const isSelected = (currentSelected?.id === obj.id) || (currentTourActive && currentTourActive.id === obj.id);
          
          ctx.shadowBlur = (isHovered || isSelected) ? 22 : 8;
          ctx.shadowColor = obj.color;

          // Glowing satellite core
          const moonGrad = ctx.createRadialGradient(
            obj.x - obj.size * 0.3, obj.y - obj.size * 0.3, 0,
            obj.x, obj.y, obj.size
          );
          moonGrad.addColorStop(0, '#ffffff');
          moonGrad.addColorStop(0.4, obj.color);
          moonGrad.addColorStop(1, '#0a0914');

          ctx.fillStyle = moonGrad;
          ctx.beginPath();
          ctx.arc(obj.x, obj.y, obj.size, 0, Math.PI * 2);
          ctx.fill();

          // Outer selection cursor ring
          if (isSelected) {
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(obj.x, obj.y, obj.size + 4, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        ctx.restore();
      });

      // Save to latest rendering list for event handlers
      latestRenderingList = renderingList;

      // Request next frame
      frame++;
      animationId = requestAnimationFrame(animateUniverse);
    };

    let frame = 0;
    animateUniverse();

    // Mouse handlers on canvas
    const handleCanvasMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.x = e.clientX - rect.left;
      mousePos.y = e.clientY - rect.top;

      if (isDragging) {
        const deltaX = e.clientX - dragStartX;
        orbitRotationOffset += deltaX * 0.003;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
      }
    };

    const handleCanvasMouseDown = (e: MouseEvent) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
    };

    const handleCanvasMouseUp = (e: MouseEvent) => {
      isDragging = false;
      const distance = Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY);
      
      // Treat as click if not dragged far
      if (distance < 5 && hoveredObjectId) {
        playClick();
        if (hoveredObjectType === 'planet') {
          onSelectCategory(hoveredObjectId);
        } else if (hoveredObjectType === 'moon') {
          const clickedNode = latestRenderingList.find((n: any) => n.id === hoveredObjectId);
          if (clickedNode) {
            setSelectedAchievement(clickedNode.achievement);
          }
        }
      }
    };

    canvas.addEventListener('mousemove', handleCanvasMouseMove);
    canvas.addEventListener('mousedown', handleCanvasMouseDown);
    window.addEventListener('mouseup', handleCanvasMouseUp);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleCanvasMouseMove);
        canvas.removeEventListener('mousedown', handleCanvasMouseDown);
      }
      window.removeEventListener('mouseup', handleCanvasMouseUp);
      cancelAnimationFrame(animationId);
    };
  }, [chronologicalAchievements, onSelectCategory]);

  // Autopilot navigation trigger handlers
  const handleTourPrev = () => {
    playClick();
    setTourIndex(prev => (prev === 0 ? chronologicalAchievements.length - 1 : prev - 1));
  };

  const handleTourNext = () => {
    playClick();
    setTourIndex(prev => (prev === chronologicalAchievements.length - 1 ? 0 : prev + 1));
  };

  const toggleTourMode = () => {
    playClick();
    const nextState = !tourMode;
    setTourMode(nextState);
    if (nextState) {
      setTourIndex(0);
      setSelectedAchievement(chronologicalAchievements[0]);
    } else {
      setSelectedAchievement(null);
    }
  };

  const activeAchievementInTour = chronologicalAchievements[tourIndex];

  // Helper properties for selected moon diagnostics panel
  const activeBadge = selectedAchievement || (tourMode ? activeAchievementInTour : null);

  const getRarityConfig = (rarity: string | undefined) => {
    switch (rarity?.toLowerCase()) {
      case 'legendary': return { label: 'LEGENDARY', color: 'text-amber-400', meterColor: 'bg-amber-400' };
      case 'epic': return { label: 'EPIC', color: 'text-fuchsia-400', meterColor: 'bg-fuchsia-400' };
      case 'rare': return { label: 'RARE', color: 'text-cyan-400', meterColor: 'bg-cyan-400' };
      default: return { label: 'COMMON', color: 'text-slate-400', meterColor: 'bg-slate-400' };
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-140px)] flex flex-col justify-between overflow-hidden" ref={containerRef}>
      {/* Background radial cosmic shadows */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(8,3,24,0.25)_0%,transparent_75%] pointer-events-none" />

      {/* Galaxy header HUD panel */}
      <div className="w-full max-w-7xl mx-auto px-6 pt-6 flex flex-col lg:flex-row justify-between items-start gap-6 z-10 select-none">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col border-l border-cyan-500/30 pl-4 py-1 lg:mt-4"
        >
          <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">Cosmic Telemetry Node Online</span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-sans mt-1">
            ACHIEVEMENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">GALAXY</span>
          </h1>
          <p className="text-xs text-slate-400 max-w-sm mt-1">
            Explore my certifications, internships, and badges orbiting dynamically. Drag to manually rotate coordinates.
          </p>
        </motion.div>

        {/* Operator Profile Telemetry HUD Card & Autopilot controls */}
        <div className="flex flex-col items-stretch lg:items-end gap-3 w-full lg:w-auto">
          {/* Operator Profile Telemetry HUD Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[480px] flex flex-col border border-cyan-500/20 bg-slate-950/65 backdrop-blur-md rounded-xl px-5 py-3.5 font-mono text-[11px] text-slate-300 gap-2.5 tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.06)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
            
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
              {/* Avatar Frame with Cyber Effects */}
              <div className="relative flex-shrink-0 group">
                {/* Outer cyber rotating dashed ring */}
                <div className="absolute inset-0 -m-1.5 rounded-full border border-dashed border-cyan-500/40 animate-[spin_30s_linear_infinite] pointer-events-none" />
                {/* Pulsing neon outer circle */}
                <div className="absolute inset-0 -m-1 rounded-full border border-cyan-400/20 group-hover:border-cyan-400/40 transition-colors pointer-events-none" />
                {/* Image Container with Scanline effect */}
                <div className="relative w-[76px] h-[76px] rounded-full overflow-hidden border-2 border-cyan-400/30 bg-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.2)] select-none">
                  <img 
                    src="/avatar.jpg" 
                    alt="Operator Avatar" 
                    className="w-full h-full object-cover scale-105 transition-transform duration-500 group-hover:scale-115"
                  />
                </div>
              </div>

              {/* Operator Telemetry Information */}
              <div className="flex-1 w-full flex flex-col gap-1.5 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-1 border-b border-white/10 pb-1.5">
                  <span className="text-cyan-400 font-bold text-glow-cyan text-[12px]">OPERATOR: VIJAYAPANDIAN T</span>
                  <span className="text-purple-400 text-[10px]">B.E. CSE (PRE-FINAL)</span>
                </div>
                <div className="text-slate-200 text-[10px] sm:text-[11px]">INSTITUTION: SRM Easwari Engineering College</div>
                <div className="flex justify-between gap-4 text-slate-300">
                  <span>LOC: Chennai, Tamil Nadu</span>
                </div>
              </div>
            </div>

            {/* Contact Details Grid */}
            <div className="flex flex-col md:flex-row justify-between gap-x-6 gap-y-0.5 border-t border-white/10 pt-2 text-slate-400 text-[10px]">
              <span>EMAIL: vijayapandian112007@gmail.com</span>
              <span>PH: +91 8610554060</span>
            </div>

            {/* Coding & Social Profiles Grid */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2 border-t border-white/10">
              <span className="text-[10px] text-cyan-500/80 mr-1 select-none font-bold">PROFILES:</span>
              {profiles.map((profile) => (
                <a
                  key={profile.name}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClick()}
                  title={profile.name}
                  className={`w-[26px] h-[26px] rounded-md flex items-center justify-center border border-white/10 bg-white/5 text-slate-400 transition-all duration-200 cursor-pointer ${profile.colorClass}`}
                >
                  {profile.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Autopilot tour control center */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex self-stretch lg:self-end items-center justify-between lg:justify-start gap-3 bg-slate-950/65 border border-white/5 p-2 rounded-xl backdrop-blur-md"
          >
            <button
              onClick={toggleTourMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded-lg transition-all border cursor-pointer ${
                tourMode
                  ? 'bg-purple-950 border-purple-500/40 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.25)] font-bold'
                  : 'border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              {tourMode ? <Pause size={12} /> : <Play size={12} />}
              {tourMode ? 'AUTOPILOT: ACTIVE' : 'AUTOPILOT: TOUR'}
            </button>

            {tourMode && (
              <div className="flex items-center gap-1.5 border-l border-white/10 pl-3">
                <button
                  onClick={handleTourPrev}
                  className="p-1 rounded bg-white/5 border border-white/5 text-slate-400 hover:text-white cursor-pointer"
                >
                  <ArrowLeft size={11} />
                </button>
                <span className="text-[10px] font-mono text-cyan-400 min-w-[50px] text-center">
                  {tourIndex + 1} / {chronologicalAchievements.length}
                </span>
                <button
                  onClick={handleTourNext}
                  className="p-1 rounded bg-white/5 border border-white/5 text-slate-400 hover:text-white cursor-pointer"
                >
                  <ArrowRight size={11} />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main Galaxy Interactive Stage */}
      <div className="flex-1 w-full relative flex items-center justify-between my-4 min-h-[460px] max-h-[640px]">
        {/* Left Floating Info Overlay */}
        <div className="absolute left-6 top-4 z-20 pointer-events-none select-none max-w-xs space-y-4">
          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-glass border border-cyan-500/20 p-4 rounded-xl shadow-2xl relative overflow-hidden"
              style={{
                boxShadow: `0 0 25px ${hoveredNode.glowColor}, inset 0 0 10px rgba(6, 182, 212, 0.05)`,
              }}
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-400/40" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">{hoveredNode.name}</h3>
              <p className="text-[10px] text-cyan-400 font-mono mt-0.5">{hoveredNode.stat}</p>
              <p className="text-[11px] text-slate-300 mt-2 font-sans leading-relaxed">{hoveredNode.description}</p>
              <div className="mt-2.5 pt-1.5 border-t border-white/5 text-[9px] text-slate-500 font-mono flex justify-between">
                <span>ORBIT_LOCKED</span>
                <span className="text-cyan-400 animate-pulse">CLICK NODE TO DECRYPT</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* 2D Canvas Fallback / Galaxy Engine */}
        <div className="flex-1 h-full absolute inset-0 cursor-grab active:cursor-grabbing z-0">
          <canvas ref={canvas2DRef} className="w-full h-full block" />
        </div>

        {/* Right Floating Diagnostics HUD Sidebar (Holographic details) */}
        <AnimatePresence>
          {activeBadge && (
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              transition={{ type: 'spring', damping: 20 }}
              className="absolute right-6 top-4 bottom-4 w-[340px] bg-slate-950/80 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-5 z-20 flex flex-col justify-between shadow-[0_0_40px_rgba(6,182,212,0.1)] overflow-y-auto"
            >
              {/* Scan HUD Header */}
              <div>
                <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4 font-mono text-[9px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Cpu size={12} className="text-cyan-400 animate-spin-slow" /> TELEMETRY_DECK
                  </span>
                  <span className="text-cyan-400 font-bold">SECURE_SYNC</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="px-2 py-0.5 rounded border border-cyan-500/25 bg-cyan-950/20 text-cyan-400 font-mono text-[9px] uppercase tracking-wider">
                      {activeBadge.category}
                    </span>
                    <h3 className="text-base font-extrabold text-white mt-1.5 uppercase font-mono tracking-wide">
                      {activeBadge.title}
                    </h3>
                    <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                      ISSUED BY: {activeBadge.issuer}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans border-l-2 border-cyan-500/30 pl-3 py-1 bg-white/2 rounded-r-md">
                    {activeBadge.description}
                  </p>

                  {/* Skills radar stats */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Competency Vectors</span>
                    <div className="space-y-1.5 font-mono text-[10px]">
                      {activeBadge.skills.slice(0, 3).map((skill, idx) => (
                        <div key={skill} className="space-y-0.5">
                          <div className="flex justify-between text-slate-400">
                            <span className="truncate max-w-[70%]">{skill}</span>
                            <span className="text-cyan-400">Lvl {10 - idx * 2}</span>
                          </div>
                          <div className="w-full bg-slate-950 rounded-full h-[3px] border border-white/5">
                            <div className="h-full bg-cyan-400" style={{ width: `${100 - idx * 20}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
                <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 mb-2">
                  <span>DATE: {activeBadge.issueDate}</span>
                  {activeBadge.rarity && (
                    <span className={`font-bold ${getRarityConfig(activeBadge.rarity).color}`}>
                      {getRarityConfig(activeBadge.rarity).label}
                    </span>
                  )}
                </div>

                {activeBadge.image && (
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={activeBadge.image}
                    download={`${activeBadge.title.toLowerCase().replace(/\s+/g, '_')}_certificate`}
                    className="w-full flex items-center justify-center gap-1.5 bg-slate-900 border border-cyan-500/25 text-cyan-400 font-mono text-[10px] font-bold py-2 px-3 rounded-lg hover:bg-cyan-950/20 transition-all cursor-pointer"
                  >
                    <Download size={11} /> DOWNLOAD ORIGINAL SCAN
                  </motion.a>
                )}

                {activeBadge.url ? (
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={activeBadge.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-mono text-[10px] font-bold py-2 px-3 rounded-lg shadow-neon-cyan transition-all border border-cyan-400/25 cursor-pointer"
                  >
                    <ExternalLink size={11} /> VERIFY CREDENTIAL
                  </motion.a>
                ) : (
                  <div className="w-full text-center text-slate-600 font-mono text-[9px] border border-white/5 bg-slate-900/40 py-2 rounded-lg">
                    VERIFIED LOCAL SYNC ONLY
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom HUD: Space Console Controls */}
      <div className="w-full bg-black/45 border-t border-white/5 backdrop-blur-md py-4 z-10 select-none">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left Side: System settings sliders */}
          <div className="flex flex-wrap items-center gap-6 text-[10px] font-mono text-slate-400">
            {/* Speed slider */}
            <div className="flex items-center gap-2">
              <Compass size={13} className="text-cyan-400" />
              <span>ORBIT_GRAVITY:</span>
              <input
                type="range"
                min="0"
                max="2.5"
                step="0.1"
                value={orbitalSpeedScale}
                onChange={(e) => setOrbitalSpeedScale(parseFloat(e.target.value))}
                className="w-20 md:w-28 h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-cyan-400 font-bold min-w-[24px]">{orbitalSpeedScale.toFixed(1)}x</span>
            </div>

            {/* Zoom slider */}
            <div className="flex items-center gap-2">
              <ZoomIn size={13} className="text-cyan-400" />
              <span>SYSTEM_ZOOM:</span>
              <input
                type="range"
                min="0.5"
                max="2.2"
                step="0.05"
                value={zoomLevel}
                onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                className="w-20 md:w-28 h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-cyan-400 font-bold min-w-[24px]">{zoomLevel.toFixed(2)}x</span>
            </div>
          </div>

          {/* Center Side: Quick Guide toggles */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => { playClick(); setShowOrbits(!showOrbits); }}
              className={`px-3 py-1.5 rounded-lg border text-[10px] font-mono uppercase cursor-pointer transition-all ${
                showOrbits ? 'border-cyan-500/25 bg-cyan-950/20 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)]' : 'border-slate-800 bg-slate-950/40 text-slate-500'
              }`}
            >
              SHOW_ORBITS
            </button>
            <button
              onClick={() => { playClick(); setShowConstellations(!showConstellations); }}
              className={`px-3 py-1.5 rounded-lg border text-[10px] font-mono uppercase cursor-pointer transition-all ${
                showConstellations ? 'border-purple-500/25 bg-purple-950/20 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.15)]' : 'border-slate-800 bg-slate-950/40 text-slate-500'
              }`}
            >
              TIMELINE_CONSTELLATIONS
            </button>
          </div>

          {/* Right Side: Fast travel category filters */}
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-slate-500 uppercase font-bold mr-1">Sector Filters:</span>
            <div className="flex gap-1">
              {categoryPlanetConfigs.map(cfg => {
                const isActive = activePlanetFilters.includes(cfg.name);
                return (
                  <button
                    key={cfg.name}
                    title={`Filter ${cfg.name} sector`}
                    onClick={() => {
                      playClick();
                      setActivePlanetFilters(prev => 
                        prev.includes(cfg.name) ? prev.filter(c => c !== cfg.name) : [...prev, cfg.name]
                      );
                    }}
                    className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all text-xs cursor-pointer ${
                      isActive 
                        ? 'bg-slate-900 border-cyan-500/25 text-white' 
                        : 'bg-slate-950 border-white/5 text-slate-600'
                    }`}
                  >
                    {cfg.emoji}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
