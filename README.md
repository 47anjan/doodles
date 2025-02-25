# Recipe Discovery App 🍳

Welcome to our **AI-Powered Recipe Discovery App**! Discover, cook, and interact with recipes using cutting-edge AI features. This application helps food enthusiasts explore global cuisines, get cooking assistance, and manage their culinary journey.

---

## 🌟 Features

### **AI-Powered Cooking Assistant**

- **Recipe Chat**: Ask detailed questions about ingredients, substitutions, and cooking methods.
- **Ingredient Chat**: Get nutritional insights and usage suggestions for any ingredient.
- **Step-by-Step Guidance**: Interactive cooking instructions with real-time help.

### **Grocery List Generation**

- Automatically generate a shopping list for any recipe, including quantities and optional ingredients.

### **Core Features**

- **Global Recipe Database**: 500,000+ recipes via Spoonacular API.
- **Nutritional Analysis**: Detailed breakdowns for every recipe.
- **Responsive Design**: Flawless experience across all devices.

---

## 🛠 Technologies Used

### **Frontend**

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + Shadcn UI
- React Hot Toast for notifications

### **Backend**

- Next.js Server Actions
- Clerk Authentication
- Vercel AI SDK
- Google Gemini AI

### **Services**

- Spoonacular API (Recipe data)
- Clerk (Authentication)
- Google AI Studio (LLM)

---

## 🚀 Getting Started

1. **Clone Repository**

   ```bash
   git clone https://github.com/47anjan/doodles.git
   cd doodles
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create `.env.local` with:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret
   SPOONACULAR_API_KEY=your_spoonacular_key
   GOOGLE_API_KEY=your_google_ai_key
   ```

4. **Run Development Server**

   ```bash
   npm run dev
   ```

5. **Access the App**
   Visit `http://localhost:3000`

---

## 🧠 AI Features Overview

### **Recipe Assistant**

- Ask questions like:
  - "What can I substitute for eggs in this recipe?"
  - "How do I make this vegetarian?"
  - "Break down the nutritional content."
  - "Generate a grocery list for this recipe."

### **Ingredient Expert**

- Get information about:
  - Nutritional values
  - Storage tips
  - Seasonal availability
  - Flavor pairings

### **Smart Cooking**

- Real-time conversion between measurement units.
- Allergy-aware substitutions.
- Equipment alternatives.
- Cooking time optimization.

---

## 🔒 Authentication Flow

We use **Clerk** for secure authentication:

- **Social Logins**: Google, GitHub, Facebook.
- **Magic Link Authentication**.
- **Session Management**.
- **User Profile Management**.

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/amazing-feature`.
3. Commit changes: `git commit -m 'Add amazing feature'`.
4. Push to branch: `git push origin feature/amazing-feature`.
5. Open a Pull Request.

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 📧 Contact

Have questions or suggestions?  
Reach out at [anjankarmakar15@gmail.com](mailto:anjankarmakar15@gmail.com).

---

Happy Cooking and Coding!

```

```
