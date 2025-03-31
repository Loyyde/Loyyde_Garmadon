import os

slide_folder = 'Slide'
image_extensions = ['.jpg', '.jpeg', '.png', '.gif']
image_files = []

if os.path.exists(slide_folder) and os.path.isdir(slide_folder):
    for filename in os.listdir(slide_folder):
        if any(filename.lower().endswith(ext) for ext in image_extensions):
            image_files.append(os.path.join(slide_folder, filename))

# Enclose each filename in single quotes
quoted_image_files = [f"'{file}'" for file in image_files]

javascript_array = f"const imageFilenames = [\n    {''},\n    '.join(quoted_image_files)}\n];"

output_filename = 'image_list.js'
with open(output_filename, 'w') as f:
    f.write(javascript_array)

print(f"Generated '{output_filename}' with the list of image files.")
