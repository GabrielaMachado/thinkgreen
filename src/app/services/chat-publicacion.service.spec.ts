import { TestBed } from '@angular/core/testing';

import { ChatPublicacionService } from './chat-publicacion.service';

describe('ChatPublicacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatPublicacionService = TestBed.get(ChatPublicacionService);
    expect(service).toBeTruthy();
  });
});
