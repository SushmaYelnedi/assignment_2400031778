import { useEffect, useState } from 'react';
import './App.css';

const API = 'http://localhost:2001/SportsFacility';

const emptyForm = {
  facilityName: '',
  sportType: '',
  indoor: '',
  hourlyFee: ''
};

function App() {
  const [facilities, setFacilities] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function request(url, options = {}) {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    const text = await response.text();
    let data = null;

    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (!response.ok) {
      const message =
        data?.message ||
        (typeof data === 'string' ? data : 'Request failed');

      throw new Error(
        typeof message === 'string'
          ? message
          : JSON.stringify(message)
      );
    }

    return data;
  }

  async function loadFacilities() {
    setLoading(true);
    setError('');

    try {
      const data = await request(`${API}/displayall`);
      setFacilities(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(`Could not load facilities: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFacilities();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setError('');

    const payload = {
      ...form,
      facilityName: form.facilityName.trim(),
      sportType: form.sportType.trim(),
      indoor: form.indoor === 'true',
      hourlyFee: Number(form.hourlyFee)
    };

    try {
      if (editId === null) {
        await request(`${API}/add`, {
          method: 'POST',
          body: JSON.stringify(payload)
        });

        setMessage('Sports facility added successfully!');
      } else {
        await request(`${API}/update/${editId}`, {
          method: 'PUT',
          body: JSON.stringify(payload)
        });

        setMessage('Sports facility updated successfully!');
      }

      setForm(emptyForm);
      setEditId(null);
      await loadFacilities();
    } catch (err) {
      setError(err.message);
    }
  }

  function handleEdit(facility) {
    setEditId(facility.id);
    setForm({
      facilityName: facility.facilityName,
      sportType: facility.sportType,
      indoor: String(facility.indoor),
      hourlyFee: String(facility.hourlyFee)
    });

    setMessage('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this facility?')) {
      return;
    }

    setMessage('');
    setError('');

    try {
      await request(`${API}/delete/${id}`, {
        method: 'DELETE'
      });

      setMessage('Sports facility deleted successfully!');
      await loadFacilities();
    } catch (err) {
      setError(err.message);
    }
  }

  function handleCancel() {
    setForm(emptyForm);
    setEditId(null);
    setMessage('');
    setError('');
  }

  return (
    <div className="app-shell">
      <nav className="navbar navbar-dark bg-primary shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold">
            Sports Facility Management
          </span>
          <span className="text-white small">Admin Dashboard</span>
        </div>
      </nav>

      <main className="container py-4 py-md-5">
        <div className="hero-section mb-4">
          <p className="text-primary fw-semibold mb-2">
            SPORTS FACILITY MANAGEMENT SYSTEM
          </p>
          <h1 className="fw-bold">Manage Sports Facilities</h1>
          <p className="text-secondary mb-0">
            Add, view, update and manage sports facility details.
          </p>
        </div>

        {message && (
          <div className="alert alert-success" role="status">
            {message}
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
            {error.toLowerCase().includes('fetch') && (
              <div className="mt-2">
                Check that the backend is running on port 2001
                and allows requests from this frontend.
              </div>
            )}
          </div>
        )}

        <div className="row g-4">
          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-1">
                  {editId === null ? 'Add Sports Facility' : 'Update Sports Facility'}
                </h4>
                <p className="text-secondary small mb-4">
                  Enter the facility details below.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Facility Name</label>
                    <input
                      className="form-control"
                      name="facilityName"
                      value={form.facilityName}
                      onChange={handleChange}
                      placeholder="Enter facility name"
                      maxLength={100}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Sport Type</label>
                    <input
                      className="form-control"
                      name="sportType"
                      value={form.sportType}
                      onChange={handleChange}
                      placeholder="e.g. Badminton"
                      maxLength={100}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Indoor Facility</label>
                    <select
                      className="form-select"
                      name="indoor"
                      value={form.indoor}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select indoor or outdoor</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Hourly Fee</label>
                    <input
                      className="form-control"
                      type="number"
                      name="hourlyFee"
                      value={form.hourlyFee}
                      onChange={handleChange}
                      min="0"
                      step="any"
                      placeholder="Enter hourly fee"
                      required
                    />
                  </div>

                  <button className="btn btn-primary w-100" type="submit">
                    {editId === null ? 'Add Facility' : 'Save Changes'}
                  </button>

                  {editId !== null && (
                    <button
                      className="btn btn-outline-secondary w-100 mt-2"
                      type="button"
                      onClick={handleCancel}
                    >
                      Cancel Edit
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
                  <div>
                    <h4 className="fw-bold mb-1">Sports Facility Directory</h4>
                    <p className="text-secondary small mb-0">
                      Total facilities: {facilities.length}
                    </p>
                  </div>

                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={loadFacilities}
                    type="button"
                  >
                    Refresh
                  </button>
                </div>

                {loading ? (
                  <p className="text-secondary py-4 text-center">
                    Loading facilities...
                  </p>
                ) : facilities.length === 0 ? (
                  <p className="text-secondary py-4 text-center">
                    No facilities found. Add your first facility!
                  </p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>ID</th>
                          <th>Facility Name</th>
                          <th>Sport Type</th>
                          <th>Indoor</th>
                          <th>Hourly Fee</th>
                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {facilities.map((facility) => (
                          <tr key={facility.id}>
                            <td>{facility.id}</td>
                            <td>{facility.facilityName}</td>
                            <td>{facility.sportType}</td>
                            <td>{facility.indoor ? 'Yes' : 'No'}</td>
                            <td>{facility.hourlyFee}</td>
                            <td>
                              <div className="d-flex gap-2">
                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => handleEdit(facility)}
                                  type="button"
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDelete(facility.id)}
                                  type="button"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center text-secondary py-4 small">
        Sports Facility Management System
      </footer>
    </div>
  );
}

export default App;