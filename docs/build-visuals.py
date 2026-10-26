"""Build editable SVG documentation graphics. Uses only Python's standard library."""
from pathlib import Path
from html import escape

OUT = Path(__file__).parent / 'assets'
OUT.mkdir(exist_ok=True)

def start(title, subtitle, height):
    return [f'<svg xmlns="http://www.w3.org/2000/svg" width="1120" height="{height}" viewBox="0 0 1120 {height}" role="img" aria-labelledby="title desc">',
    f'<title id="title">{escape(title)}</title><desc id="desc">{escape(subtitle)}</desc>',
    '<defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10Z" fill="#5486b4"/></marker></defs>',
    f'<rect width="1120" height="{height}" rx="20" fill="#f2f8fe"/>',
    '<g font-family="Segoe UI, Arial, sans-serif">',
    f'<text x="40" y="52" fill="#12344e" font-size="26" font-weight="700">{escape(title)}</text>',
    f'<text x="40" y="82" fill="#48657c" font-size="16">{escape(subtitle)}</text>']

def box(s,x,y,w,h,title,lines,accent=False):
    s.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="12" fill="{"#dfedfc" if accent else "white"}" stroke="#b8cfe3"/>')
    s.append(f'<text x="{x+18}" y="{y+31}" fill="#12344e" font-size="18" font-weight="700">{escape(title)}</text>')
    for i,line in enumerate(lines):
        s.append(f'<text x="{x+18}" y="{y+59+23*i}" fill="#48657c" font-size="15">{escape(line)}</text>')

def arrow(s,d,dashed=False):
    dash='stroke-dasharray="7 5"' if dashed else ''
    s.append(f'<path d="{d}" fill="none" stroke="#5486b4" stroke-width="2" {dash} marker-end="url(#arrow)"/>')

def finish(s,name,h,footer):
    s.extend([f'<text x="40" y="{h-25}" fill="#48657c" font-size="14">{escape(footer)}</text>','</g></svg>'])
    (OUT/name).write_text('\n'.join(s)+'\n',encoding='utf-8')

s=start('CustomIQ','Personalized 3D Avatar & AI Assistant · Flutter / Node.js prototype',390)
s.append('<text x="40" y="137" fill="#237ac2" font-size="17" font-weight="600">REINVENT EVERY DAY</text>')
for x,title,lines in [(40,'Make it yours',['Avatar creation and customization','Ready Player Me integration']),(405,'Bring it into view',['GLB models and AR-enabled viewing','Configurable rendering settings']),(770,'Give it a voice',['Conversational personas','Avatar chat interface and TTS'])]:
    box(s,x,175,310,125,title,lines,True)
finish(s,'overview.svg',390,'Project overview · original prototype screens and current checkout status are documented below.')

s=start('From avatar to interaction','Product journey illustrated by the historical presentation and public Flutter modules',440)
stages=[('01 · Account',['Register and sign in']),('02 · Avatar',['Create or load GLB']),('03 · Configure',['Quality, textures, pose']),('04 · Persona',['Choose a chat role']),('05 · Interact',['Avatar and speech'])]
for i,(title,lines) in enumerate(stages):
    x=40+i*216
    box(s,x,150,184,125,title,lines,i==4)
    if i<4:arrow(s,f'M{x+184} 210 H{x+216}')
box(s,256,310,608,70,'AR-enabled model viewing · device support required',[],True)
finish(s,'user-journey.svg',440,'Historical AI demo: public avatar-chat responses are placeholders until backend inference is connected.')

s=start('Application architecture','Public modules and integration boundaries · not a claim of a fully connected live AI pipeline',690)
box(s,40,140,325,135,'Flutter application',['Accounts and profile','Avatar viewing and model loading','Persona chat and rendering settings'],True)
box(s,425,140,310,135,'Express API',['Users and authentication','Avatars, conversations, messages','Provider credentials on server'],True)
box(s,795,140,285,135,'MongoDB / Mongoose',['User and avatar records','Conversation/message models'])
box(s,40,355,325,110,'Ready Player Me',['Embedded avatar creator','Hosted GLB model URLs'])
box(s,425,355,310,110,'Device capabilities',['ModelViewer with AR enabled','Flutter TTS voice playback'])
box(s,795,355,285,110,'OpenAI integration',['Server-side avatar images','Existing generation endpoint'])
box(s,40,535,695,80,'Camera / ML Kit exploration',['Camera capture and object-detection module'])
arrow(s,'M365 200 H425');arrow(s,'M735 200 H795');arrow(s,'M200 275 V355')
arrow(s,'M270 275 V310 H580 V355');arrow(s,'M670 275 V320 H938 V355')
arrow(s,'M40 230 H20 V575 H40')
finish(s,'architecture.svg',690,'Live persona-chat backend inference is not connected in the public screen. OpenAI image output is not a 3D GLB model.')
print('Built overview, user journey and architecture SVGs')
