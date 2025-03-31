import os

def generate_showcase_list(root_dir="."):
    """
    Generates image_list.js based on images in subfolders of the 'Showcase' folder.

    Args:
        root_dir (str, optional): The root directory where the 'Showcase' folder is located. Defaults to ".".
    """

    showcase_folder = os.path.join(root_dir, "Showcase")
    showcase_image_paths = []
    subfolders = ["Kendrick", "Drake", "Eminem", "Jay-Z", "Nas"]

    if os.path.exists(showcase_folder) and os.path.isdir(showcase_folder):
        for subfolder in subfolders:
            subfolder_path = os.path.join(showcase_folder, subfolder)
            if os.path.exists(subfolder_path) and os.path.isdir(subfolder_path):
                for filename in os.listdir(subfolder_path):
                    if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
                        showcase_image_paths.append(os.path.join("Showcase", subfolder, filename).replace("\\", "/"))

    with open("image_list.js", "w") as f:
        f.write("const imageFilenames = [\n")
        for i, path in enumerate(showcase_image_paths):
            f.write(f"    '{path}'{',' if i < len(showcase_image_paths) - 1 else ''}\n")
        f.write("];\n")

    print("image_list.js generated successfully.")

if __name__ == "__main__":
    generate_showcase_list()
    print("\nMake sure you have a 'Showcase' folder in the same directory as this script.")
    print("Inside the 'Showcase' folder, create subfolders named 'Kendrick', 'Drake', 'Eminem', 'Jay-Z', and 'Nas'.")
    print("Place the corresponding images inside each of these subfolders.")
