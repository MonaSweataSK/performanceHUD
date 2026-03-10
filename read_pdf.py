from pypdf import PdfReader
reader = PdfReader(r"c:\Users\Senthi Kumar\Downloads\react-perf-hud-PRD.pdf")
text = ""
for page in reader.pages:
    text += page.extract_text() + "\n"
with open("prd.txt", "w", encoding="utf-8") as f:
    f.write(text)
