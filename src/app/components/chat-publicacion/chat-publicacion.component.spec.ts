import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPublicacionComponent } from './chat-publicacion.component';

describe('ChatPublicacionComponent', () => {
  let component: ChatPublicacionComponent;
  let fixture: ComponentFixture<ChatPublicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatPublicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
