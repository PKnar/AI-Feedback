import torch
import sys
import json
from PIL import Image


model = torch.hub.load('ultralytics/yolov5', 'custom', path='backend/models/best.pt')

def predict(image_path):
    results = model(image_path)
    predictions = [
        {
            'x_center': box[0].item(),
            'y_center': box[1].item(),
            'width': box[2].item(),
            'height': box[3].item(),
            'confidence': box[4].item(),
            'label': results.names[int(box[5].item())]
        }
        for box in results.xywh[0]
    ]
    return json.dumps(predictions)

if __name__ == '__main__':
    image_path = sys.argv[1]
    print(predict(image_path))





