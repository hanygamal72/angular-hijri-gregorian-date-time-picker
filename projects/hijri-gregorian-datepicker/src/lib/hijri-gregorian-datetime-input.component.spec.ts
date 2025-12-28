import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HijriGregorianDatetimeInputComponent } from './hijri-gregorian-datetime-input.component';
import { HijriGregorianDatepickerComponent } from './hijri-gregorian-datepicker.component';

describe('HijriGregorianDatetimeInputComponent', () => {
  let component: HijriGregorianDatetimeInputComponent;
  let fixture: ComponentFixture<HijriGregorianDatetimeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HijriGregorianDatetimeInputComponent,
        HijriGregorianDatepickerComponent,
      ],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HijriGregorianDatetimeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should implement ControlValueAccessor', () => {
    expect(component.writeValue).toBeDefined();
    expect(component.registerOnChange).toBeDefined();
    expect(component.registerOnTouched).toBeDefined();
    expect(component.setDisabledState).toBeDefined();
  });

  it('should toggle dropdown on input click', () => {
    expect(component.isDropdownOpen).toBeFalsy();
    component.toggleDropdown();
    expect(component.isDropdownOpen).toBeTruthy();
    component.toggleDropdown();
    expect(component.isDropdownOpen).toBeFalsy();
  });

  it('should not open dropdown when disabled', () => {
    component.disabled = true;
    component.toggleDropdown();
    expect(component.isDropdownOpen).toBeFalsy();
  });

  it('should close dropdown on Escape key', () => {
    component.isDropdownOpen = true;
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    component.onEscapeKey(event);
    expect(component.isDropdownOpen).toBeFalsy();
  });

  it('should clear value', () => {
    component.displayValue = 'Test Date';
    component.clearValue();
    expect(component.displayValue).toBe('');
    expect(component.getValue()).toBeNull();
  });
});
