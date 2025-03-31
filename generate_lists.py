import os

def generate_all_image_lists(root_dir="."):
    """
    Generates image_list.js containing both slideshow and showcase image paths.

    Args:
        root_dir (str, optional): The root directory where 'Slide' and 'Showcase' folders are located. Defaults to ".".
    """

    slide_folder = os.path.join(root_dir, "Slide")
    showcase_folder = os.path.join(root_dir, "Showcase")

    # --- Generate slideImageFilenames ---
    slide_image_paths = []
    if os.path.exists(slide_folder) and os.path.isdir(slide_folder):
        for filename in os.listdir(slide_folder):
            if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
                slide_image_paths.append(os.path.join("Slide", filename).replace("\\", "/"))

    # --- Generate showcaseImageFilenames ---
    showcase_image_paths = []
    subfolders = ["Kendrick", "Drake", "Eminem", "Jay-Z", "Nas"]
    if os.path.exists(showcase_folder) and os.path.isdir(showcase_folder):
        for subfolder in subfolders:
            subfolder_path = os.path.join(showcase_folder, subfolder)
            if os.path.exists(subfolder_path) and os.path.isdir(subfolder_path):
                for filename in os.listdir(subfolder_path):
                    if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
                        showcase_image_paths.append(os.path.join("Showcase", subfolder, filename).replace("\\", "/"))

    # --- Write to image_list.js ---
    with open("image_list.js", "w") as f:
        f.write("const imageFilenames = {\n")

        f.write("    slideImageFilenames: [\n")
        for i, path in enumerate(slide_image_paths):
            f.write(f"        '{path}'{',' if i < len(slide_image_paths) - 1 else ''}\n")
        f.write("    ],\n")

        f.write("    showcaseImageFilenames: [\n")
        for i, path in enumerate(showcase_image_paths):
            f.write(f"        '{path}'{',' if i < len(showcase_image_paths) - 1 else ''}\n")
        f.write("    ]\n")

        f.write("};\n")

    print("image_list.js generated successfully.")

if __name__ == "__main__":
    generate_all_image_lists()
    print("\nMake sure you have 'Slide' and 'Showcase' folders in the same directory as this script.")
    print("The 'Showcase' folder should contain subfolders named 'Kendrick', 'Drake', 'Eminem', 'Jay-Z', and 'Nas' with your images.")
    print("The 'Slide' folder should contain the images for your slideshow.")
