export const OPS = {
  paintXObject: 1,
  paintImageXObject: 2,
  paintJpegXObject: 3,
};

const mockTextItems = [
  {
    str: 'Hello',
    transform: [1, 0, 0, 1, 50, 700],
    width: 40,
    height: 10,
    fontName: 'F1',
  },
  {
    str: 'World',
    transform: [1, 0, 0, 1, 100, 700],
    width: 50,
    height: 10,
    fontName: 'F1',
  },
];

const mockPage = {
  getViewport: jest.fn(() => ({
    width: 600,
    height: 800,
  })),

  getTextContent: jest.fn(async () => ({
    items: mockTextItems,
  })),

  getOperatorList: jest.fn(async () => ({
    fnArray: [
      OPS.paintXObject, // giả lập có image
    ],
  })),
};

const mockPdf = {
  numPages: 2,
  getPage: jest.fn(async () => mockPage),
};

export const getDocument = jest.fn(() => ({
  promise: Promise.resolve(mockPdf),
}));

export const GlobalWorkerOptions = {
  workerSrc: '',
};
