import os

def generate_slide_list(root_dir="."):
    """
    Generates slide_list.js based on images in the 'Slide' folder.

    Args:
        root_dir (str, optional): The root directory where the 'Slide' folder is located. Defaults to ".".
    """

    slide_folder = os.path.join(root_dir, "Slide")
    slide_image_paths = []

    if os.path.exists(slide_folder) and os.path.isdir(slide_folder):
        for filename in os.listdir(slide_folder):
            if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
                slide_image_paths.append(os.path.join("Slide", filename).replace("\\", "/"))

    with open("slide_list.js", "w") as f:
        f.write("const slideImageFilenames = [\n")
        for i, path in enumerate(slide_image_paths):
            f.write(f"    '{path}'{',' if i < len(slide_image_paths) - 1 else ''}\n")
        f.write("];\n")

    print("slide_list.js generated successfully.")

if __name__ == "__main__":
    generate_slide_list()
    print("\nMake sure you have a 'Slide' folder in the same directory as this script.")
    print("Place all the images for your slideshow inside the 'Slide' folder.")
