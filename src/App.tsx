import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Typography,
  Container,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Email,
  Phone,
  Telegram,
  Code,
  Group,
  Psychology,
  Work,
  Star,
  ArrowUpward,
} from "@mui/icons-material";

// Particle Background Component
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const container = document.getElementById("portfolio-container");

    if (!canvas || !ctx || !container) return;

    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }[] = [];

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    const createParticles = () => {
      const numParticles = 80;
      particles = [];
      const { width, height } = canvas.getBoundingClientRect();
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
          radius: Math.random() * 1.2 + 0.5,
        });
      }
    };

    const animate = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fill();
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      setCanvasSize();
      createParticles();
    };

    setCanvasSize();
    createParticles();
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
};

// Scroll to top component
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
          }}
        >
          <Tooltip title="Наверх">
            <IconButton
              onClick={scrollToTop}
              sx={{
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)",
                },
                boxShadow: "0 4px 8px rgba(33, 150, 243, 0.3)",
              }}
            >
              <ArrowUpward />
            </IconButton>
          </Tooltip>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main App Component
function App() {

  // Состояние для уведомлений
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });

  // Функция для копирования в буфер обмена
  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setSnackbar({
        open: true,
        message: `${type} скопирован в буфер обмена!`,
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Ошибка при копировании",
        severity: "error",
      });
    }
  };

  // Функция для закрытия уведомления
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const skills = [
    { name: "HTML5", icon: <Code />, color: "#E34F26" },
    { name: "CSS3", icon: <Code />, color: "#1572B6" },
    { name: "JavaScript (ES6+)", icon: <Code />, color: "#F7DF1E" },
    { name: "TypeScript", icon: <Code />, color: "#3178C6" },
    { name: "React", icon: <Code />, color: "#61DAFB" },  
    { name: "React Router", icon: <Code />, color: "#CA4245" },
    { name: "Vite", icon: <Code />, color: "#646CFF" },
    { name: "Tailwind CSS", icon: <Code />, color: "#38BDF8" },
    { name: "REST API (Fetch/Axios)", icon: <Code />, color: "#00BCD4" },
    { name: "Django REST Framework (базово)", icon: <Code />, color: "#092E20" },
  ];

  const softSkills = [
    "Аналитическое мышление",
    "Коммуникация",
    "Быстрое обучение",
    "Работа в условиях неопределенности",
    "Командная работа",
    "Ответственность",
  ];

  const careerInterests = [
    {
      title: "Архитектура React-приложений",
      description:
        "Фиче‑слайсы, переиспользуемые компоненты, clean-code, контроль сайд‑эффектов и кеширование данных.",
    },
    {
      title: "Производительность и UX",
      description:
        "Мемоизация, разделение кода, виртуализация списков, плавные анимации без потери FPS.",
    },
    {
      title: "Инфраструктура фронтенда",
      description:
        "Конфигурация Vite/ESLint/Prettier",
    },
  ];

  return (
    <Box
      id="portfolio-container"
      sx={{ minHeight: "100vh", position: "relative" }}
    >
      <ParticleBackground />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Container maxWidth="lg" sx={{ pt: 4, pb: 2 }}>
          <Paper
            elevation={8}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Box textAlign="center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
              >
                <Typography
                  variant="h2"
                  fontWeight="bold"
                  sx={{
                    color: "#E0E0E0",
                    mb: 1,
                    fontSize: { xs: "1.5rem", sm: "2rem", md: "2.9rem" },
                    textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
                    background: "linear-gradient(45deg, #E0E0E0, #B0B0B0)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Одеров Александр Сергеевич
                </Typography>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#B0B0B0",
                    mb: 3,
                    fontSize: { xs: "1.1rem", md: "1.5rem" },
                  }}
                >
                  Frontend-разработчик • React/TypeScript • Готов к собеседованию
                </Typography>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Tooltip title="Кликните, чтобы скопировать email">
                    <IconButton
                      onClick={() =>
                        copyToClipboard("oderovaleksandr@gmail.com", "Email")
                      }
                      sx={{
                        color: "#E0E0E0",
                        "&:hover": {
                          color: "#2196F3",
                          transform: "scale(1.1)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Email />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Кликните, чтобы скопировать номер телефона">
                    <IconButton
                      onClick={() =>
                        copyToClipboard("+7 (988) 288-69-50", "Номер телефона")
                      }
                      sx={{
                        color: "#E0E0E0",
                        "&:hover": {
                          color: "#2196F3",
                          transform: "scale(1.1)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Phone />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Кликните, чтобы скопировать Telegram">
                    <IconButton
                      onClick={() =>
                        copyToClipboard("@quuwweeeerrr", "Telegram")
                      }
                      sx={{
                        color: "#E0E0E0",
                        "&:hover": {
                          color: "#2196F3",
                          transform: "scale(1.1)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Telegram />
                    </IconButton>
                  </Tooltip>
                </Box>
              </motion.div>
            </Box>
          </Paper>
        </Container>
      </motion.div>

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <Paper
            elevation={8}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                color: "#E0E0E0",
                mb: 3,
                textAlign: "center",
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              Ключевые компетенции и навыки
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  color: "#B0B0B0",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Code sx={{ color: "#2196F3" }} />
                Профильные направления
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 3 }}>
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Chip
                      icon={skill.icon}
                      label={skill.name}
                      sx={{
                        background: `linear-gradient(45deg, ${skill.color}20, ${skill.color}40)`,
                        color: "#E0E0E0",
                        border: `1px solid ${skill.color}60`,
                        "&:hover": {
                          background: `linear-gradient(45deg, ${skill.color}30, ${skill.color}50)`,
                        },
                      }}
                    />
                  </motion.div>
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  color: "#B0B0B0",
                  mb: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Group sx={{ color: "#2196F3" }} />
                Гибкие навыки (Soft Skills)
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                {softSkills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Chip
                      label={skill}
                      sx={{
                        background:
                          "linear-gradient(45deg, #9C27B020, #9C27B040)",
                        color: "#E0E0E0",
                        border: "1px solid #9C27B060",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #9C27B030, #9C27B050)",
                        },
                      }}
                    />
                  </motion.div>
                ))}
              </Box>
            </Box>
          </Paper>
        </Container>
      </motion.div>

      {/* Experience Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <Paper
            elevation={8}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                color: "#E0E0E0",
                mb: 3,
                textAlign: "center",
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              Опыт и проекты
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Work sx={{ color: "#2196F3", fontSize: "2rem" }} />
              <Box>
                <Typography
                  variant="h6"
                  sx={{ color: "#E0E0E0", fontWeight: "bold" }}
                >
                  Фронтенд‑разработчик (учебные проекты)
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "#B0B0B0" }}>
                  2024-2025
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="body1"
              sx={{ color: "#E0E0E0", mb: 3, lineHeight: 1.8 }}
            >
              Разрабатывал и поддерживал SPA на React/TypeScript: роутинг (React Router), формы и валидация,
              оптимизация рендеринга, сборка на Vite, стилизация Tailwind/MUI. Интеграция с REST API
              через Fetch/Axios.
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ color: "#B0B0B0", mb: 2 }}>
                Моя роль и подход:
              </Typography>
              <Box sx={{ pl: 2 }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#E0E0E0",
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Group sx={{ color: "#2196F3", fontSize: "1.2rem" }} />
                  <strong>Лидерство:</strong> Организация workflow команды,
                  распределение задач по силам участников.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#E0E0E0",
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Code sx={{ color: "#2196F3", fontSize: "1.2rem" }} />
                  <strong>Разработка:</strong> Создание клиентской части на
                  React/TypeScript.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#E0E0E0",
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Psychology sx={{ color: "#2196F3", fontSize: "1.2rem" }} />
                  <strong>Полный цикл:</strong> Для понимания всего процесса,
                  также участвовал углубленно в создании фронтенда, простого
                  бэкенда и прототипов интерфейса в Figma.
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background: "linear-gradient(45deg, #2196F320, #21CBF320)",
                border: "1px solid rgba(33, 150, 243, 0.3)",
              }}
            >
              <Typography
                variant="body1"
                sx={{ color: "#E0E0E0", fontStyle: "italic" }}
              >
                <strong>Результат:</strong> Успешная сдача проекта. Этот опыт
                показал, что мой главный интерес — это организация процесса,
                решение нестандартных задач и ответственность за конечный
                результат, а не только написание кода.
              </Typography>
            </Box>
          </Paper>
        </Container>
      </motion.div>

      {/* Career Interests Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.8 }}
      >
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <Paper
            elevation={8}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                color: "#E0E0E0",
                mb: 3,
                textAlign: "center",
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              Фокус фронтенд‑разработки
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: "#E0E0E0", mb: 3, lineHeight: 1.8 }}
            >
              Цель — роль Frontend (React/TypeScript). Сильные стороны: чистая архитектура,
              внимательность к UX, производительность, поддерживаемость кода.
            </Typography>

            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              }}
            >
              {careerInterests.map((interest, index) => (
                <motion.div
                  key={interest.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.9 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Paper
                    elevation={4}
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.08)",
                        border: "1px solid rgba(33, 150, 243, 0.3)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: "#2196F3", mb: 1, fontWeight: "bold" }}
                    >
                      {interest.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#B0B0B0", lineHeight: 1.6 }}
                    >
                      {interest.description}
                    </Typography>
                  </Paper>
                </motion.div>
              ))}
            </Box>
          </Paper>
        </Container>
      </motion.div>

      {/* Why Me Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.1, duration: 0.8 }}
      >
        <Container maxWidth="lg" sx={{ py: 2, pb: 4 }}>
          <Paper
            elevation={8}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                color: "#E0E0E0",
                mb: 3,
                textAlign: "center",
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              Почему я?
            </Typography>

            <Box sx={{ display: "grid", gap: 3 }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.3 }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Star sx={{ color: "#FFD700", fontSize: "2rem" }} />
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ color: "#E0E0E0", fontWeight: "bold", mb: 1 }}
                    >
                      Широкий кругозор
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#B0B0B0", lineHeight: 1.6 }}
                    >
                      Понимаю полный цикл создания продукта: от идеи и макета до
                      разработки.
                    </Typography>
                  </Box>
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.5 }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Psychology sx={{ color: "#2196F3", fontSize: "2rem" }} />
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ color: "#E0E0E0", fontWeight: "bold", mb: 1 }}
                    >
                      Адаптивность
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#B0B0B0", lineHeight: 1.6 }}
                    >
                      Быстро учусь и эффективно применяю новые знания в
                      практике.
                    </Typography>
                  </Box>
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.7 }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Group sx={{ color: "#9C27B0", fontSize: "2rem" }} />
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ color: "#E0E0E0", fontWeight: "bold", mb: 1 }}
                    >
                      Инициативность
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#B0B0B0", lineHeight: 1.6 }}
                    >
                      Вижу зоны ответственности и готов их брать на себя для
                      достижения общей цели.
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Box>
          </Paper>
        </Container>
      </motion.div>

      <ScrollToTop />

      {/* Snackbar для уведомлений */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "#E0E0E0",
            "& .MuiAlert-icon": {
              color: snackbar.severity === "success" ? "#4CAF50" : "#F44336",
            },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
