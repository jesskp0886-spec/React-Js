import { useState, useEffect } from "react";
import {
  Button,
  Label,
  TextInput,
  Select,
  Radio,
  Checkbox,
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
} from "flowbite-react";
import { Pencil, Trash2, X, TriangleAlert } from "lucide-react";

const hobbyOptions = ["Reading", "Sports", "Music", "Traveling", "Gaming", "Cooking"];

const emptyForm = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
  hobbies: [],
  mobileNumber: "",
  address: "",
  city: "",
  state: "",
  country: "",
};

const STORAGE_KEY = "registeredUsers";

export default function RegisterForm() {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [users, setUsers] = useState([]);
  // null = creating a new user; a number = index of the user currently being edited
  const [editingIndex, setEditingIndex] = useState(null);
  // index of the user pending delete confirmation, or null
  const [deleteIndex, setDeleteIndex] = useState(null);

  // Load existing data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setUsers(JSON.parse(stored));
    }
  }, []);

  const persist = (nextUsers) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUsers));
    setUsers(nextUsers);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleHobbyChange = (hobby) => {
    setFormData((prev) => {
      const isSelected = prev.hobbies.includes(hobby);
      return {
        ...prev,
        hobbies: isSelected
          ? prev.hobbies.filter((h) => h !== hobby)
          : [...prev.hobbies, hobby],
      };
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.gender) newErrors.gender = "Please select a gender";

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Enter a valid 10-digit number";
    }

    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    if (editingIndex !== null) {
      // Update the existing record in place
      const updatedUsers = users.map((u, idx) => (idx === editingIndex ? formData : u));
      persist(updatedUsers);
      setSuccessMsg("User updated successfully!");
      setEditingIndex(null);
    } else {
      // Append a new record
      const updatedUsers = [...users, formData];
      persist(updatedUsers);
      setSuccessMsg("Registered successfully!");
    }

    setFormData(emptyForm);
  };

  const startEdit = (idx) => {
    setFormData(users[idx]);
    setEditingIndex(idx);
    setErrors({});
    setSuccessMsg("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setFormData(emptyForm);
    setErrors({});
  };

  const confirmDelete = () => {
    if (deleteIndex === null) return;
    const updatedUsers = users.filter((_, idx) => idx !== deleteIndex);
    persist(updatedUsers);
    // If the row being deleted was mid-edit, reset the form
    if (editingIndex === deleteIndex) {
      cancelEdit();
    }
    setDeleteIndex(null);
    setSuccessMsg("User deleted.");
  };

  const inputTheme = {
    field: {
      input: {
        base: "block w-full border-2 bg-cream text-ink placeholder:text-ink/40 rounded-lg focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        colors: {
          gray: "border-ink/15 focus:border-coral focus:ring-coral/40",
          failure: "border-coral focus:border-coral focus:ring-coral/40",
        },
      },
    },
  };

  const selectTheme = {
    field: {
      select: {
        base: "block w-full border-2 bg-cream text-ink rounded-lg focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        colors: {
          gray: "border-ink/15 focus:border-coral focus:ring-coral/40",
          failure: "border-coral focus:border-coral focus:ring-coral/40",
        },
      },
    },
  };

  const labelClass = "block text-xs font-semibold tracking-wide text-ink/70 mb-1.5";

  const sectionHeading = (title) => (
    <div className="flex items-center gap-3 mb-4">
      <h2 className="font-display text-sm font-bold text-ink whitespace-nowrap">{title}</h2>
      <div className="h-px flex-1 bg-ink/15" />
    </div>
  );

  return (
    <div className="min-h-screen bg-cream px-4 py-10">
      <div className="w-full max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-xl shadow-ink/10 bg-cream">
        {/* Header band */}
        <div className="bg-ink px-6 sm:px-10 pt-8 pb-10 relative">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-cream leading-none">
                Sign Up
              </h1>
              <p className="text-cream/60 text-sm mt-2 max-w-xs">
                Fill in your details below to create your account.
              </p>
            </div>
            <span className="shrink-0 rounded-full border border-cream/30 px-4 py-1.5 text-[11px] font-semibold text-cream/80">
              {editingIndex !== null ? "EDITING" : "NEW ACCOUNT"}
            </span>
          </div>
        </div>

        {/* Coral identity band, overlapping the header like an invoice-to block */}
        <div className="px-6 sm:px-10 -mt-5 relative">
          <div className="bg-coral rounded-2xl px-5 py-4 flex items-center justify-between shadow-lg shadow-coral/20">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-cream/80">
                {editingIndex !== null ? "Editing" : "Registering as"}
              </p>
              <p className="font-display text-lg font-bold text-cream truncate max-w-[220px] sm:max-w-xs">
                {formData.firstName || formData.lastName
                  ? `${formData.firstName} ${formData.lastName}`.trim()
                  : "New Member"}
              </p>
            </div>
            <div className="bg-mustard rounded-xl px-3 py-1.5 text-ink font-display font-bold text-sm shrink-0">
              {hobbyOptions.filter((h) => formData.hobbies.includes(h)).length} hobbies
            </div>
          </div>
        </div>

        <div className="px-6 sm:px-10 pt-8 pb-10">
          {successMsg && (
            <p className="mb-6 text-sm font-medium text-ink bg-mustard/30 border-2 border-mustard rounded-lg px-4 py-2.5">
              {successMsg}
            </p>
          )}

          {editingIndex !== null && (
            <div className="mb-6 flex items-center justify-between gap-3 rounded-lg border-2 border-ink/15 bg-tan/40 px-4 py-2.5">
              <p className="text-sm font-medium text-ink">
                Editing record for{" "}
                <span className="font-bold">
                  {users[editingIndex]?.firstName} {users[editingIndex]?.lastName}
                </span>
              </p>
              <button
                type="button"
                onClick={cancelEdit}
                className="inline-flex items-center gap-1 text-xs font-semibold text-ink/70 hover:text-coral-dark"
              >
                <X className="h-3.5 w-3.5" />
                Cancel
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Account section */}
            <div>
              {sectionHeading("Account")}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username" className={labelClass}>
                    Username
                  </Label>
                  <TextInput
                    id="username"
                    name="username"
                    theme={inputTheme}
                    color={errors.username ? "failure" : "gray"}
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="johndoe123"
                  />
                  {errors.username && (
                    <p className="text-xs text-coral-dark mt-1">{errors.username}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className={labelClass}>
                      First Name
                    </Label>
                    <TextInput
                      id="firstName"
                      name="firstName"
                      theme={inputTheme}
                      color={errors.firstName ? "failure" : "gray"}
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="text-xs text-coral-dark mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName" className={labelClass}>
                      Last Name
                    </Label>
                    <TextInput
                      id="lastName"
                      name="lastName"
                      theme={inputTheme}
                      color={errors.lastName ? "failure" : "gray"}
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="text-xs text-coral-dark mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className={labelClass}>
                    Email
                  </Label>
                  <TextInput
                    id="email"
                    type="email"
                    name="email"
                    theme={inputTheme}
                    color={errors.email ? "failure" : "gray"}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-xs text-coral-dark mt-1">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password" className={labelClass}>
                      Password
                    </Label>
                    <TextInput
                      id="password"
                      type="password"
                      name="password"
                      theme={inputTheme}
                      color={errors.password ? "failure" : "gray"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                    />
                    {errors.password && (
                      <p className="text-xs text-coral-dark mt-1">{errors.password}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword" className={labelClass}>
                      Confirm Password
                    </Label>
                    <TextInput
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      theme={inputTheme}
                      color={errors.confirmPassword ? "failure" : "gray"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                    />
                    {errors.confirmPassword && (
                      <p className="text-xs text-coral-dark mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Personal section */}
            <div>
              {sectionHeading("Personal")}
              <div className="space-y-4">
                <div>
                  <Label className={labelClass}>Gender</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Male", "Female", "Other"].map((g) => {
                      const active = formData.gender === g;
                      return (
                        <label
                          key={g}
                          className={`cursor-pointer rounded-full border-2 px-4 py-1.5 text-sm font-medium transition-colors ${
                            active
                              ? "bg-ink border-ink text-cream"
                              : "border-ink/15 text-ink/70 hover:border-ink/40"
                          }`}
                        >
                          <Radio
                            name="gender"
                            value={g}
                            checked={active}
                            onChange={handleChange}
                            className="hidden"
                          />
                          {g}
                        </label>
                      );
                    })}
                  </div>
                  {errors.gender && <p className="text-xs text-coral-dark mt-1">{errors.gender}</p>}
                </div>

                <div>
                  <Label className={labelClass}>Hobbies</Label>
                  <div className="flex flex-wrap gap-2">
                    {hobbyOptions.map((hobby) => {
                      const active = formData.hobbies.includes(hobby);
                      return (
                        <label
                          key={hobby}
                          className={`cursor-pointer rounded-full border-2 px-4 py-1.5 text-sm font-medium transition-colors ${
                            active
                              ? "bg-mustard border-mustard-dark text-ink"
                              : "border-ink/15 text-ink/70 hover:border-ink/40"
                          }`}
                        >
                          <Checkbox
                            checked={active}
                            onChange={() => handleHobbyChange(hobby)}
                            className="hidden"
                          />
                          {hobby}
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact & address section */}
            <div>
              {sectionHeading("Contact & Address")}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="mobileNumber" className={labelClass}>
                    Mobile Number
                  </Label>
                  <TextInput
                    id="mobileNumber"
                    type="tel"
                    name="mobileNumber"
                    theme={inputTheme}
                    color={errors.mobileNumber ? "failure" : "gray"}
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="9876543210"
                  />
                  {errors.mobileNumber && (
                    <p className="text-xs text-coral-dark mt-1">{errors.mobileNumber}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="address" className={labelClass}>
                    Address
                  </Label>
                  <TextInput
                    id="address"
                    name="address"
                    theme={inputTheme}
                    color={errors.address ? "failure" : "gray"}
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                  />
                  {errors.address && (
                    <p className="text-xs text-coral-dark mt-1">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city" className={labelClass}>
                      City
                    </Label>
                    <TextInput
                      id="city"
                      name="city"
                      theme={inputTheme}
                      color={errors.city ? "failure" : "gray"}
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Surat"
                    />
                    {errors.city && <p className="text-xs text-coral-dark mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <Label htmlFor="state" className={labelClass}>
                      State
                    </Label>
                    <TextInput
                      id="state"
                      name="state"
                      theme={inputTheme}
                      color={errors.state ? "failure" : "gray"}
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Gujarat"
                    />
                    {errors.state && <p className="text-xs text-coral-dark mt-1">{errors.state}</p>}
                  </div>
                  <div>
                    <Label htmlFor="country" className={labelClass}>
                      Country
                    </Label>
                    <Select
                      id="country"
                      name="country"
                      theme={selectTheme}
                      color={errors.country ? "failure" : "gray"}
                      value={formData.country}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Other">Other</option>
                    </Select>
                    {errors.country && (
                      <p className="text-xs text-coral-dark mt-1">{errors.country}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                className="w-full bg-mustard hover:bg-mustard-dark text-ink font-display font-bold text-base py-0.5 rounded-xl border-0 shadow-md shadow-mustard/30 focus:ring-mustard-dark"
              >
                {editingIndex !== null ? "Update" : "Register"}
              </Button>
              {editingIndex !== null && (
                <Button
                  type="button"
                  onClick={cancelEdit}
                  className="shrink-0 bg-cream hover:bg-cream-dark text-ink font-display font-bold text-base py-0.5 rounded-xl border-2 border-ink/15"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Data table */}
      {users.length > 0 && (
        <div className="w-full max-w-6xl mx-auto mt-10 rounded-3xl overflow-hidden shadow-xl shadow-ink/10">
          <div className="bg-ink px-6 py-5 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-cream">Registered Users</h2>
            <Badge className="bg-mustard text-ink font-semibold">{users.length} total</Badge>
          </div>
          <div className="bg-cream overflow-x-auto">
            <Table>
              <TableHead className="bg-cream-dark text-ink font-display font-semibold text-xs uppercase tracking-wide [&>tr]:bg-cream-dark">
                <TableRow>
                  <TableHeadCell className="text-ink">Username</TableHeadCell>
                  <TableHeadCell className="text-ink">Name</TableHeadCell>
                  <TableHeadCell className="text-ink">Email</TableHeadCell>
                  <TableHeadCell className="text-ink">Gender</TableHeadCell>
                  <TableHeadCell className="text-ink">Hobbies</TableHeadCell>
                  <TableHeadCell className="text-ink">Mobile</TableHeadCell>
                  <TableHeadCell className="text-ink">Address</TableHeadCell>
                  <TableHeadCell className="text-ink">City</TableHeadCell>
                  <TableHeadCell className="text-ink">State</TableHeadCell>
                  <TableHeadCell className="text-ink">Country</TableHeadCell>
                  <TableHeadCell className="text-ink text-right">Actions</TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody className="divide-y divide-ink/10">
                {users.map((u, idx) => (
                  <TableRow
                    key={idx}
                    className={`border-t border-ink/10 text-ink/90 bg-transparent ${
                      idx % 2 === 1 ? "bg-tan/40" : ""
                    } ${editingIndex === idx ? "outline outline-2 outline-mustard -outline-offset-2" : ""}`}
                  >
                    <TableCell className="px-4 py-3 whitespace-nowrap">{u.username}</TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">
                      {u.firstName} {u.lastName}
                    </TableCell>
                    <TableCell className="px-4 py-3">{u.email}</TableCell>
                    <TableCell className="px-4 py-3">{u.gender}</TableCell>
                    <TableCell className="px-4 py-3">{u.hobbies.join(", ")}</TableCell>
                    <TableCell className="px-4 py-3 whitespace-nowrap">{u.mobileNumber}</TableCell>
                    <TableCell className="px-4 py-3">{u.address}</TableCell>
                    <TableCell className="px-4 py-3">{u.city}</TableCell>
                    <TableCell className="px-4 py-3">{u.state}</TableCell>
                    <TableCell className="px-4 py-3">{u.country}</TableCell>
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(idx)}
                          title="Edit"
                          className="inline-flex items-center justify-center h-8 w-8 rounded-lg border-2 border-ink/15 text-ink/70 hover:border-mustard-dark hover:bg-mustard/20 hover:text-ink transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteIndex(idx)}
                          title="Delete"
                          className="inline-flex items-center justify-center h-8 w-8 rounded-lg border-2 border-ink/15 text-ink/70 hover:border-coral hover:bg-coral/10 hover:text-coral-dark transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      <Modal show={deleteIndex !== null} size="md" onClose={() => setDeleteIndex(null)} popup>
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <TriangleAlert className="mx-auto mb-4 h-12 w-12 text-coral" />
            <h3 className="mb-1 font-display text-lg font-bold text-ink">Delete this user?</h3>
            <p className="mb-5 text-sm text-ink/70">
              {deleteIndex !== null && (
                <>
                  This will permanently remove{" "}
                  <span className="font-semibold text-ink">
                    {users[deleteIndex]?.firstName} {users[deleteIndex]?.lastName}
                  </span>{" "}
                  from the list. This can't be undone.
                </>
              )}
            </p>
            <div className="flex justify-center gap-3">
              <Button
                onClick={confirmDelete}
                className="bg-coral hover:bg-coral-dark text-cream font-display font-bold border-0 focus:ring-coral-dark"
              >
                Yes, delete
              </Button>
              <Button
                onClick={() => setDeleteIndex(null)}
                className="bg-cream hover:bg-cream-dark text-ink font-display font-bold border-2 border-ink/15"
              >
                Cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
