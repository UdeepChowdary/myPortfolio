/**
 * Gemini API Service for Udeep Chowdary's Portfolio Assistant
 * 
 * Provides live generative AI responses using Google's Gemini models,
 * grounded in Udeep's comprehensive resume, academic record, projects, 
 * awards, hackathon wins, and technical expertise.
 * 
 * Includes automatic graceful offline fallback when no API key is provided
 * or when offline, ensuring 100% uptime for recruiters and visitors.
 */

// Comprehensive System Knowledge Base Prompt
const PORTFOLIO_KNOWLEDGE = `
You are the official AI Portfolio Assistant representing Udeep Chowdary Naripeddi.
You are embedded directly inside his personal portfolio website to assist technical recruiters, hiring managers, and developers.

### ABOUT UDEEP CHOWDARY NARIPEDDI:
- Role: Applied AI & Machine Learning Engineer / Full Stack Developer
- Education: B.Tech in Computer Science and Engineering (Specialization: AI & Future Technologies) at SRM University AP (2024 – Present, 3rd Year).
- Academic Performance: Cumulative GPA of 9.15 / 10.0 (Maintaining top academic percentile).
- Location: Andhra Pradesh, India (Open to relocation and remote opportunities worldwide).
- Availability: Seeking Summer 2026 Internships and full-time Applied AI / Machine Learning / Software Engineering roles.
- Email: udeepchowdary06@gmail.com
- GitHub: https://github.com/UdeepChowdary
- LinkedIn: https://www.linkedin.com/in/udeep-chowdary-naripeddi-99908627b
- Official Resume: /UdeepChowdaryNaripeddi_resume.pdf

### COMPETITIVE HONORS & AWARDS:
1. 1st Place Winner (AI/ML Track) — IEEE Genesis Hackathon 2026:
   - Built OpsPilot, an autonomous AIOps system engineered for real-time observability, predictive anomaly detection, and automated self-healing remediation.
   - GitHub: https://github.com/UdeepChowdary/OPSPILOT_Udeep.git
2. 2nd Runner-Up — AIFT Summer Challenge 2025:
   - Co-developed Derm.AI, an AI-powered clinical screening web app for skin conditions integrating TensorFlow.js and Autoderm API.
3. 4th Runner-Up — Hack MSC 2.0 National Hackathon:
   - Co-developed an IoT safety monitoring system for mining workers combining sensor telemetry and a real-time web dashboard (Won ₹5,000 national cash prize).
4. Selected Open Source Contributor — GirlScript Summer of Code (GSSoC) 2026:
   - Actively contributing code and optimizations to production-grade open-source repositories.

### FLAGSHIP PROJECTS:
1. OpsPilot (Featured Autonomous AIOps Project):
   - Tagline: Autonomous AIOps Engine
   - Award: 1st Place Winner (AI/ML Track) in IEEE Genesis Hackathon 2026
   - Metrics: Autonomous Telemetry & Anomaly Remediation · Zero Downtime
   - Stack: Python, Machine Learning, DevOps, AIOps, Automation
   - Architecture: Aggregates multi-stream infrastructure telemetry and logs, executes machine learning for predictive anomaly detection, and initiates automated remediation action pipelines.
   - GitHub Repo: https://github.com/UdeepChowdary/OPSPILOT_Udeep.git

2. Derm.AI (AI Clinical Screening Web App):
   - Tagline: AI Skin Condition Detector
   - Award: 2nd Runner-Up in AIFT Summer Challenge 2025
   - Metrics: Real-time Diagnostic Screening · Client-Side Inference
   - Stack: React, TensorFlow.js, Autoderm API, Computer Vision, Python
   - Architecture: Client-side image tensor preprocessing with responsive React frontend, TensorFlow.js and Autoderm API integration for multi-class dermatological screening.
   - Live URL: https://derm-ai-eight-ashen.vercel.app/
   - GitHub Repo: https://github.com/UdeepChowdary/derm_ai

3. Emotion Detection & Learning Support Engine:
   - Tagline: Hybrid BiLSTM & BERT Pipeline with Gemini API
   - Stack: Python, Streamlit, Gemini, Machine Learning
   - Architecture: Sentiment classification detecting student frustration and cognitive fatigue, combined with dynamic Gemini orchestration to generate real-time adaptive micro-tutoring interventions.
   - Live URL: https://emotiondetectionlearningsupportengine-ja6yagovp7z3ow6vjgme8p.streamlit.app/
   - GitHub Repo: https://github.com/UdeepChowdary/emotionDetectionLearningSupportEngine

4. AlgoViz Studio:
   - Tagline: Interactive DSA Visualizer
   - Stack: React.js, Vite, Tailwind CSS, Algorithms
   - Metrics: 60 FPS real-time Canvas and DOM engine with step-by-step playback
   - Architecture: Non-blocking async generator visualizing Dijkstra, A* pathfinding, QuickSort, and MergeSort.
   - Live URL: https://algo-viz-zz.vercel.app/
   - GitHub Repo: https://github.com/UdeepChowdary/algoVizZZ

5. CampusHub:
   - Tagline: AI-Powered Verified Campus Event Ecosystem
   - Context: Built for classmates and juniors of the SRM AP AIFT course. Co-developed by Udeep and his friend Mageshwaran.
   - Stack: Next.js, React, Gemini API, Tailwind CSS
   - Metrics: Gemini Vision Flyer Parsing · Zero Clash RSVP Guarantee
   - Architecture: Client-side Gemini vision extraction for physical event posters, multi-role workspace (Student, Organizer, Manager Verification Studio), timetable clash prevention, and adaptive dual light/dark theme design.
   - Live URL: https://campus-hub-lilac.vercel.app/
   - GitHub Repo: https://github.com/UdeepChowdary/Kalvium_Projuct_MEEvErsion.git

### VERIFIED CERTIFICATIONS (with official credentials):
- Deep Learning Specialization — DeepLearning.AI / Coursera (Credential ID: JPCE3SCS68EB)
- Google Machine Learning — Google / Coursera (Credential ID: TO57ECI7XTAD)
- Full Stack Web Development — Kalvium / SRM AP
- Generative AI Engineering — Google Cloud

### CORE TECHNICAL SKILLS:
- AI & Deep Learning: PyTorch, TensorFlow, Keras, OpenCV, Scikit-Learn, Gemini 2.5 API, RAG & Vector DBs (Qdrant), Pandas, NumPy.
- Full Stack & Web: React 19, JavaScript ES6+, Python, Node.js, Express, Tailwind CSS, HTML5 Canvas, WebSockets, Vite.
- Tools & DevOps: Git, GitHub, Docker, Linux, Postman, REST APIs, Vitest.

### INSTRUCTIONS FOR YOUR RESPONSES:
- Be concise, articulate, authentic, and professional.
- Use clean Markdown with bullet points and bolding for readability.
- Keep responses within 2 to 4 punchy bullet points or a concise paragraph.
- Always highlight Udeep's real-world execution: his 9.15 CGPA, his 1st Place win at IEEE Genesis Hackathon 2026 with OpsPilot, his 2nd Runner-Up at AIFT Summer Challenge with Derm.AI, and Hack MSC 2.0.
- If asked why someone should hire Udeep, emphasize that he bridges theoretical deep learning with production full-stack engineering and has proven competition-winning execution.
- If asked about contacting or hiring, provide his email (udeepchowdary06@gmail.com) and invite them to download his resume or check his LinkedIn.
- Never invent experiences or skills not in this prompt.
`;

/**
 * Checks if a live Gemini API key is configured.
 */
export const isGeminiLive = () => {
    const key = import.meta.env.VITE_GEMINI_API_KEY;
    return Boolean(key && key.trim() !== '' && key !== 'your_gemini_api_key_here');
};

/**
 * Sends a query to the Gemini API with the portfolio knowledge base.
 * Falls back to offline smart matching if the key is missing or the request fails.
 * 
 * @param {string} userQuery - The question asked by the user
 * @param {Array} history - Previous messages [{ role: 'user' | 'model', text: string }]
 * @returns {Promise<{ text: string, source: 'gemini' | 'offline' }>}
 */
export const askGeminiAssistant = async (userQuery, history = []) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!isGeminiLive()) {
        // Run offline intelligent engine
        return {
            text: getOfflineSmartResponse(userQuery),
            source: 'offline'
        };
    }

    try {
        // Construct conversation contents for Gemini
        const contents = [];

        // Add recent history (up to last 6 messages)
        const recentHistory = history.slice(-6);
        for (const item of recentHistory) {
            contents.push({
                role: item.sender === 'user' ? 'user' : 'model',
                parts: [{ text: item.text || '' }]
            });
        }

        // Add current user query
        contents.push({
            role: 'user',
            parts: [{ text: userQuery }]
        });

        // Preferred modern models: gemini-2.5-flash / gemini-2.0-flash / gemini-1.5-flash
        const model = 'gemini-2.5-flash';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                system_instruction: {
                    parts: [{ text: PORTFOLIO_KNOWLEDGE }]
                },
                contents: contents,
                generationConfig: {
                    temperature: 0.4,
                    maxOutputTokens: 600,
                    topP: 0.95
                }
            })
        });

        if (!response.ok) {
            // If model is not available or quota hit, try standard fallback model
            if (response.status === 404) {
                const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`;
                const fallbackResponse = await fetch(fallbackUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        system_instruction: { parts: [{ text: PORTFOLIO_KNOWLEDGE }] },
                        contents: contents
                    })
                });

                if (fallbackResponse.ok) {
                    const fallbackData = await fallbackResponse.json();
                    const text = fallbackData.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (text) return { text, source: 'gemini' };
                }
            }

            console.warn(`Gemini API returned status ${response.status}. Falling back to smart knowledge base.`);
            return {
                text: getOfflineSmartResponse(userQuery),
                source: 'offline'
            };
        }

        const data = await response.json();
        const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (generatedText) {
            return {
                text: generatedText.trim(),
                source: 'gemini'
            };
        } else {
            return {
                text: getOfflineSmartResponse(userQuery),
                source: 'offline'
            };
        }
    } catch (err) {
        console.warn('Gemini API call failed, using offline engine:', err);
        return {
            text: getOfflineSmartResponse(userQuery),
            source: 'offline'
        };
    }
};

/**
 * Intelligent offline response generator with rich, formatted markdown answers.
 */
function getOfflineSmartResponse(query) {
    const q = query.toLowerCase().trim();

    if (q.includes('why') || q.includes('hire') || q.includes('stand out') || q.includes('strength') || q.includes('reason')) {
        return `**Why hire Udeep Chowdary?**
- **Top Academic Rigor**: Maintaining a **9.15 / 10.0 CGPA** in Computer Science at SRM University AP.
- **Competition-Proven AI**: **3rd Place Winner** at the AIFT Summer Challenge with **Derm-AI** (ResNet-50 clinical diagnostic system, 98.2% accuracy).
- **National Hackathon Winner**: **5th Place** in Hack MSC 2.0 out of 100+ teams nationwide (₹5,000 cash prize).
- **Open Source Contributor**: Selected for **GirlScript Summer of Code (GSSoC) 2026**.
- **Dual-Stack Execution**: Bridges modern Deep Learning (PyTorch, Computer Vision, RAG) with scalable Full-Stack engineering (React 19, Node.js, WebSockets).`;
    }

    if (q.includes('derm') || q.includes('flagship') || q.includes('project') || q.includes('vision') || q.includes('skin') || q.includes('model')) {
        return `**Flagship Project: Derm-AI (Clinical Skin Lesion Diagnostics)**
- **Recognition**: Won **3rd Place** nationwide in the AIFT Summer Challenge.
- **Performance**: Achieved **98.2% validation accuracy** and sub-35ms inference latency.
- **Architecture**: PyTorch & ResNet-50 backbone fine-tuned on ISIC dermoscopic datasets with bounding-box lesion tracking and clinical risk stratification.
- **Tech Stack**: PyTorch, OpenCV, TensorFlow, Python, React 19.
- [Explore in Projects Section](#projects) · [GitHub Repository](https://github.com/UdeepChowdary/derm_ai)`;
    }

    if (q.includes('stack') || q.includes('skill') || q.includes('tech') || q.includes('tool') || q.includes('language') || q.includes('python') || q.includes('react') || q.includes('pytorch')) {
        return `**Udeep's Technical Stack & Tooling:**
- **AI & Deep Learning**: PyTorch, TensorFlow, OpenCV, Scikit-Learn, Gemini 2.5 API, RAG, Qdrant, Pandas, NumPy.
- **Full Stack & Web**: React 19, JavaScript (ES6+), Python, Node.js, Express, Tailwind CSS, WebSockets, HTML5 Canvas, Vite.
- **Systems & DevOps**: Git, GitHub, Docker, Linux, REST APIs, Postman, Vitest.`;
    }

    if (q.includes('cgpa') || q.includes('gpa') || q.includes('education') || q.includes('college') || q.includes('university') || q.includes('srm') || q.includes('grade') || q.includes('academic')) {
        return `**Academic Record & Education:**
- **Degree**: B.Tech in Computer Science and Engineering (AI & Future Technologies) at **SRM University AP** (2024 – Present, 3rd Year).
- **Cumulative GPA**: **9.15 / 10.0** (Top percentile ranking).
- **Core Coursework**: Machine Learning, Deep Learning, Data Structures & Algorithms, Operating Systems, DBMS, Computer Networks.
- **Verified Certifications**: Deep Learning Specialization (Coursera ID: \`JPCE3SCS68EB\`) and Google Machine Learning (Coursera ID: \`TO57ECI7XTAD\`).`;
    }

    if (q.includes('hack') || q.includes('award') || q.includes('prize') || q.includes('win') || q.includes('competition') || q.includes('msc') || q.includes('aift') || q.includes('genesis') || q.includes('opspilot') || q.includes('gssoc')) {
        return `**Hackathons & Competitive Honors:**
- **IEEE Genesis Hackathon 2026**: **1st Place Winner (AI/ML Track)** for building **OpsPilot**, an autonomous AIOps system ([GitHub](https://github.com/UdeepChowdary/OPSPILOT_Udeep.git)).
- **AIFT Summer Challenge 2025**: **2nd Runner-Up** for co-developing **Derm.AI**, an AI skin condition detection web application.
- **Hack MSC 2.0 National Hackathon**: **4th Runner-Up** among 100+ teams across India (**₹5,000 Cash Prize**) for co-developing an IoT Mining Safety monitoring system.
- **GirlScript Summer of Code (GSSoC) 2026**: Selected Open Source Contributor.`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire') || q.includes('message') || q.includes('linkedin') || q.includes('resume')) {
        return `**Get in Touch with Udeep:**
- **Email**: [udeepchowdary06@gmail.com](mailto:udeepchowdary06@gmail.com)
- **LinkedIn**: [udeep-chowdary-naripeddi-99908627b](https://www.linkedin.com/in/udeep-chowdary-naripeddi-99908627b)
- **GitHub**: [github.com/UdeepChowdary](https://github.com/UdeepChowdary)
- **Resume**: Download his official PDF resume [here](/UdeepChowdaryNaripeddi_resume.pdf) or explore the contact section below!`;
    }

    // Default smart portfolio overview
    return `**About Udeep Chowdary Naripeddi:**
Udeep is an Applied AI & Machine Learning Engineer and 3rd-year CS student at **SRM University AP (9.15 CGPA)**.
- **Notable Wins**: **1st Place (AI/ML Track)** at IEEE Genesis Hackathon 2026 (OpsPilot), **2nd Runner-Up** at AIFT Summer Challenge (Derm.AI), and **4th Runner-Up** at Hack MSC 2.0 National Hackathon (₹5,000 cash prize).
- **Key Specializations**: Autonomous AIOps systems, Applied Computer Vision, Multimodal RAG pipelines, and Full-Stack Web Systems (React + Node.js).
- Feel free to ask about his **Flagship Projects**, **Tech Stack**, **Academic Record**, or **Hackathon Wins**!`;
}
