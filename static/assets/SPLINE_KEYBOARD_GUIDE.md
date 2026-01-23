# Creating Your 3D Keyboard in Spline

This guide walks you through creating the 3D tech stack keyboard for your portfolio.

## Quick Start

1. Go to [Spline](https://spline.design/) and create a free account
2. Create a new project
3. Build your keyboard following the steps below
4. Export as `.spline` file
5. Save to `static/assets/skills-keyboard.spline`
6. Set `ENABLE_3D_KEYBOARD = true` in `src/routes/+layout.svelte`

---

## Step-by-Step Guide

### 1. Create the Keyboard Base

1. **Add a Rounded Rectangle** (or Box)
   - Press `R` or use the Shape menu
   - Dimensions: ~800 x 400 x 50
   - Corner radius: 20
   - This is your keyboard body

2. **Name it "keyboard"**
   - Select the object
   - In the right panel, rename to `keyboard`
   - This is CRITICAL - the code looks for this name

3. **Add a Material**
   - Dark gray or black works well
   - Add slight metallic sheen
   - Consider a subtle gradient

### 2. Create a Single Keycap Template

1. **Add a Rounded Box**
   - Dimensions: ~80 x 80 x 40
   - Corner radius: 8-12
   - This is your keycap

2. **Style the Keycap**
   - Light gray or white base
   - Subtle shadow
   - Slight bevel on edges

3. **Add the Logo**
   - Import an SVG/PNG of the tech logo
   - Position on top face of keycap
   - Size: ~50x50

### 3. Create All 30 Keys

**IMPORTANT:** Each keycap must be named EXACTLY as listed below (lowercase):

#### Row 1 - Languages
| Key Name | Logo |
|----------|------|
| `python` | Python logo |
| `typescript` | TypeScript logo |
| `javascript` | JavaScript logo |
| `go` | Go gopher |
| `r` | R logo |
| `cpp` | C++ logo |

#### Row 2 - Web + Database
| Key Name | Logo |
|----------|------|
| `html` | HTML5 logo |
| `css` | CSS3 logo |
| `svelte` | Svelte logo |
| `postgresql` | PostgreSQL elephant |
| `wordpress` | WordPress logo |
| `expo` | Expo logo |

#### Row 3 - AI/ML/Data
| Key Name | Logo |
|----------|------|
| `pytorch` | PyTorch flame |
| `huggingface` | Hugging Face logo |
| `langchain` | LangChain logo |
| `numpy` | NumPy logo |
| `pandas` | pandas logo |
| `matplotlib` | Matplotlib logo |

#### Row 4 - More Packages
| Key Name | Logo |
|----------|------|
| `jupyter` | Jupyter logo |
| `tensorflow` | TensorFlow logo |
| `fastapi` | FastAPI logo |
| `docker` | Docker whale |
| `linux` | Tux penguin |
| `git` | Git logo |

#### Row 5 - DevOps + AI
| Key Name | Logo |
|----------|------|
| `github` | GitHub octocat |
| `supabase` | Supabase logo |
| `aws` | AWS logo |
| `vscode` | VS Code logo |
| `claude` | Anthropic/Claude logo |
| `openai` | OpenAI logo |

### 4. Arrange the Keys

```
Layout (5 rows x 6 columns):

[ python    ] [ typescript ] [ javascript ] [ go         ] [ r          ] [ cpp        ]
[ html      ] [ css        ] [ svelte     ] [ postgresql ] [ wordpress  ] [ expo       ]
[ pytorch   ] [ huggingface] [ langchain  ] [ numpy      ] [ pandas     ] [ matplotlib ]
[ jupyter   ] [ tensorflow ] [ fastapi    ] [ docker     ] [ linux      ] [ git        ]
[ github    ] [ supabase   ] [ aws        ] [ vscode     ] [ claude     ] [ openai     ]
```

- Gap between keys: ~10-15 units
- Offset rows slightly for visual interest
- Keys should float ~50 units above the keyboard base

### 5. Add Lighting

1. **Ambient Light**
   - Soft white
   - Intensity: 0.5-0.7

2. **Directional Light**
   - From top-front-right
   - Soft shadows
   - Intensity: 0.8-1.0

3. **Optional: Rim Light**
   - From behind
   - Subtle highlight on edges

### 6. Camera Setup

1. **Set Default Camera**
   - Position: Looking at keyboard from front
   - Slight angle (15-20 degrees from top)
   - Distance: Keyboard fills ~60% of frame

### 7. Export

1. Click the **hamburger menu** (top left)
2. Select **Export**
3. Choose **Spline File (.spline)**
4. Save as `skills-keyboard.spline`
5. Move to your project's `static/assets/` folder

---

## Pro Tips

### Make it Feel "Expensive"

1. **Depth & Shadows**
   - Enable soft shadows
   - Keys cast shadows on base
   - Subtle ambient occlusion

2. **Materials**
   - Slight glossy finish on keys
   - Subtle reflection
   - Consider glass-like material for logos

3. **Animation in Spline**
   - Add subtle idle bounce to keys
   - Hover states (key press down)
   - The code handles scroll animations

### Performance

- Keep polygon count reasonable
- Compress textures
- Test on mobile devices

### Testing

1. Save your `.spline` file to `static/assets/skills-keyboard.spline`
2. In `src/routes/+layout.svelte`, set `ENABLE_3D_KEYBOARD = true`
3. Run `npm run dev`
4. Scroll through your site to see the animations

---

## Resources

- [Spline Keyboard Tutorial](https://spline.design/tutorials/cdru3Ibj8Eg)
- [DevIcons](https://devicon.dev/) - Free tech logos
- [Simple Icons](https://simpleicons.org/) - More logos
- [SVG Repo](https://www.svgrepo.com/) - SVG icons

---

## Troubleshooting

**Keys don't animate:**
- Check that each key is named exactly as listed (lowercase)
- Ensure "keyboard" object exists and is named correctly

**Scene doesn't load:**
- Check browser console for errors
- Verify file path is correct
- Try re-exporting from Spline

**Performance issues:**
- Reduce polygon count
- Simplify materials
- Disable shadows on mobile

---

## File Checklist

Before enabling, verify:

- [ ] `skills-keyboard.spline` exists in `static/assets/`
- [ ] Main object is named `keyboard`
- [ ] All 30 keycaps are named correctly (lowercase)
- [ ] Camera is positioned well
- [ ] Lighting looks good
- [ ] File size is reasonable (<10MB ideal)
