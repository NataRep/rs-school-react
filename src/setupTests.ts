import { TextDecoder as NodeTextDecoder, TextEncoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = NodeTextDecoder as unknown as typeof globalThis.TextDecoder;

import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();