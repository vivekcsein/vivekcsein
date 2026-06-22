# Blender Asset Creation Guide

> **Version:** 1.0.0
> **Purpose:** Internal Studio Documentation & Artist Onboarding
> **Target Audience:** Clients, Blender Artists, 3D Modelers, Technical Artists, Game Developers, Freshers

---

# Overview

This guide defines the complete workflow and standards for creating **game-ready 3D assets** using Blender.

The objective is to ensure that every asset delivered to the project is:

- Game Ready
- Optimized
- Lightweight
- Consistent
- Easy to Maintain
- Compatible with Cocos Creator
- Optimized for Web, Mobile, and Desktop platforms

This document acts as the official asset creation guideline for everyone working on the project.

---

# Goals

Every artist should be able to:

- Understand the Blender interface
- Create clean and optimized models
- Build game-ready assets
- Follow studio naming conventions
- Export assets correctly
- Optimize models for WebGL and mobile devices
- Deliver production-ready files

---

# Development Philosophy

Creating beautiful models is only one part of game development.

A successful game asset should also be:

- Fast to render
- Small in file size
- Easy to animate
- Easy to modify
- Easy to reuse
- Compatible with multiple platforms

Our priority is to create assets that perform well while maintaining visual quality.

---

# Supported Software

Current production software:

- Blender (Latest Stable Version)

Target Game Engines:

- Cocos Creator
- Unity
- Unreal Engine
- Godot

Primary Target Platform:

- Web Browser (WebGL/WebGPU)
- Android
- iOS
- Desktop

---

# Why Blender?

Blender is used because it provides:

- Professional modeling tools
- Animation support
- UV editing
- PBR materials
- Rigging
- Sculpting
- Excellent export formats
- Large community support
- Free and open source

---

# Blender Basics

Every new artist should become comfortable with the following areas before starting production work.

## Interface

Understand the purpose of:

- Viewport
- Outliner
- Properties Panel
- Toolbar
- Timeline
- Collections
- 3D Cursor
- Gizmos
- Workspace Tabs

---

## Navigation

Learn how to:

- Orbit
- Pan
- Zoom
- Focus Selected Object
- Switch between Perspective and Orthographic View
- Reset Camera View

Fast navigation significantly improves modeling speed.

---

## Basic Modeling Tools

The following tools are used daily.

| Tool     | Purpose                 |
| -------- | ----------------------- |
| Move     | Position objects        |
| Rotate   | Rotate objects          |
| Scale    | Resize objects          |
| Extrude  | Create new geometry     |
| Inset    | Create inner faces      |
| Loop Cut | Add supporting geometry |
| Bevel    | Smooth hard edges       |
| Knife    | Cut custom geometry     |
| Merge    | Merge vertices          |
| Bridge   | Connect edge loops      |
| Fill     | Create missing faces    |

Artists are expected to understand when and why each tool should be used.

---

# Understanding 3D Meshes

Every object inside Blender is made from a **Mesh**.

A Mesh consists of:

- Vertices
- Edges
- Faces

These combine together to create the final model.

```
Vertex

↓

Edge

↓

Face

↓

Mesh
```

---

# Types of Faces

There are three common face types.

## Triangle (Tri)

3 Vertices

```
▲
```

Advantages

- Required by every GPU
- Final format used by game engines
- Fast to render

Disadvantages

- Harder to edit
- Poor edge flow
- Less suitable during modeling

---

## Quad

4 Vertices

```
□
```

Advantages

- Easy to edit
- Better topology
- Better animation
- Cleaner edge loops

Recommended for modeling.

---

## N-Gon

More than 4 Vertices.

Avoid whenever possible.

N-Gons can create unexpected triangulation during export.

---

# Triangles in Game Development

Although artists generally model using **Quads**, every game engine eventually converts the mesh into **Triangles** during rendering.

Triangles are the smallest renderable unit of a GPU.

When optimizing assets, always think in terms of **Triangle Count**, not just polygon count.

---

# Triangle Budget

Different platforms have different rendering limitations.

Some engines, rendering pipelines, or target devices may not efficiently support meshes with more than **8,000 triangles in a single mesh**.

To maximize compatibility and performance:

### Recommended Limits

| Asset                  | Recommended Triangle Count |
| ---------------------- | -------------------------: |
| Coin                   |                   50 - 150 |
| Crate                  |                  100 - 300 |
| Barrel                 |                  150 - 500 |
| Chair                  |                  300 - 800 |
| Small Tree             |                500 - 1,500 |
| Vehicle                |              2,000 - 6,000 |
| Character              |              3,000 - 8,000 |
| Large Environment Mesh | Split into multiple meshes |

## Studio Rule

- Prefer **multiple optimized meshes** instead of one extremely large mesh.
- Keep each individual mesh under **8K triangles** whenever practical.
- Large environments should be modular instead of being exported as one giant object.

---

# Low Poly Modeling

Our games prioritize performance.

Models should use the minimum number of triangles necessary while maintaining acceptable visual quality.

Benefits:

- Faster rendering
- Lower memory usage
- Smaller download size
- Faster loading
- Better battery life
- Better mobile performance

Always optimize before exporting.

---

# High Poly vs Low Poly

| High Poly        | Low Poly             |
| ---------------- | -------------------- |
| High detail      | Optimized detail     |
| Heavy files      | Small files          |
| Slower rendering | Fast rendering       |
| Used for baking  | Used inside the game |

Game engines primarily use **Low Poly** models.

---

# Materials

A Material defines how an object appears.

Examples:

- Wood
- Metal
- Plastic
- Glass
- Stone

Keep materials simple.

Avoid assigning many materials to a single mesh unless absolutely necessary.

More materials generally increase rendering cost.

---

# PBR Materials

Preferred texture workflow:

- Base Color
- Roughness
- Metallic
- Normal
- Ambient Occlusion
- Emissive (Optional)
- Opacity (If Required)

Only include maps that are actually used.

---

# Texture Guidelines

Recommended resolutions:

| Asset       | Texture Size               |
| ----------- | -------------------------- |
| Small Prop  | 512 × 512                  |
| Medium Prop | 1024 × 1024                |
| Character   | 1024 × 1024 or 2048 × 2048 |
| Hero Asset  | 2048 × 2048                |

Avoid using 4096×4096 textures unless approved.

---

# File Size Goals

Every asset should remain lightweight.

Recommended targets:

| Asset              | Target Size           |
| ------------------ | --------------------- |
| Small Prop         | Under 300 KB          |
| Medium Prop        | Under 1 MB            |
| Character          | Under 2 MB            |
| Environment Module | As small as practical |

Smaller assets improve loading speed and reduce bandwidth usage.

---

# Supported Export Formats

## FBX (.fbx)

Best for:

- Characters
- Animations
- Rigged models

Pros

- Industry standard
- Excellent animation support
- Widely supported

Cons

- Larger file size

---

## glTF (.gltf)

Best for:

- Modern game engines
- Web applications
- PBR workflows

Pros

- Lightweight
- Open standard
- Fast loading

Cons

- Uses external texture files

---

## GLB (.glb)

Best for:

- Web deployment
- Cocos Creator
- Asset previews

Pros

- Single file
- Small size
- Fast loading
- Easy distribution

Preferred format for web-based projects whenever animation requirements permit.

---

# Cocos Creator Requirements

Every exported model must satisfy the following:

- Apply Location
- Apply Rotation
- Apply Scale
- Correct object origin
- Clean UV mapping
- Proper normals
- No duplicate vertices
- No hidden geometry
- No unused materials
- No unused textures
- Correct object naming
- Optimized triangle count
- Tested after import

---

# Naming Convention

Examples:

```
SM_Barrel_01
SM_Rock_02
SM_Tree_01
SM_House_01

CH_Player
CH_Guard

WP_Sword
WP_Bow

MAT_Wood
MAT_Metal

T_Wood_BaseColor
T_Wood_Normal
```

Never submit files named:

```
Cube

Cube.001

Object

Test

Final

Final_Final

New Object
```

---

# Client Deliverables

Every completed asset submission should include:

- Blender Source File (.blend)
- FBX Export
- GLB Export
- Textures
- Preview Images
- Triangle Count
- Material Count
- Texture Resolution
- Version Number

---

# Artist Submission Checklist

Before submitting any model, verify:

- [ ] Correct scale
- [ ] Rotation applied
- [ ] Location applied
- [ ] Origin correctly placed
- [ ] Clean topology
- [ ] No N-Gons
- [ ] UV completed
- [ ] Materials verified
- [ ] Texture sizes optimized
- [ ] Triangle count checked
- [ ] Mesh under project limits
- [ ] Naming convention followed
- [ ] Export tested in Cocos Creator

---

# Interview Questions

## Beginner

### 1. What is a Vertex?

**Answer:**
A Vertex is a single point in 3D space. Vertices connect together to form edges and faces.

---

### 2. What is an Edge?

**Answer:**
An Edge is a straight line connecting two vertices.

---

### 3. What is a Face?

**Answer:**
A Face is the visible surface created by connecting vertices and edges.

---

### 4. What is a Mesh?

**Answer:**
A Mesh is a collection of vertices, edges, and faces that form a 3D object.

---

### 5. What is the difference between a Triangle and a Quad?

**Answer:**
A Triangle has three vertices and is the final primitive rendered by the GPU. A Quad has four vertices and is easier to edit and maintain during modeling.

---

### 6. Why are Quads preferred while modeling?

**Answer:**
Quads provide cleaner topology, better edge flow, easier editing, and better deformation for animated models.

---

### 7. Why are Triangles important in game engines?

**Answer:**
All modern GPUs render triangles. Every mesh is eventually converted into triangles during rendering.

---

### 8. Why should large meshes be split?

**Answer:**
Smaller meshes are easier to stream, optimize, cull, and render efficiently. They also help stay within platform triangle limits.

---

### 9. What is Low Poly modeling?

**Answer:**
Low Poly modeling focuses on using the minimum number of triangles required to achieve the desired visual quality, improving performance and reducing file size.

---

### 10. Why do we apply transforms before export?

**Answer:**
Applying transforms ensures the model retains the correct position, rotation, and scale when imported into the game engine.

---

# Studio Principles

> A model is not considered complete when it looks good—it is complete when it is optimized, correctly exported, tested inside the game engine, documented, and ready for production.

Every asset should balance **visual quality**, **performance**, and **maintainability**. Consistent standards reduce production time, improve collaboration, and ensure a smooth workflow from Blender to Cocos Creator.
